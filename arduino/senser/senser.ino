#include <Arduino.h>

void AE_HX711_Init(void);
void AE_HX711_Reset(void);
long AE_HX711_Read(void);
long AE_HX711_Averaging(long adc,char num);
float AE_HX711_getGram(char num);

// original source
// https://akizukidenshi.com/download/ds/akizuki/ae_hx711.zip

//---------------------------------------------------//
// ピンの設定
//---------------------------------------------------//
#define pin_dout  8
#define pin_slk   9


#define OUT_VOL   0.0007f      //定格出力 [V]
#define LOAD      2000.0f    //定格容量 [g]


float offset;

float eps = 0.1;
float prev;

void setup() {
  Serial.begin(19200);
  AE_HX711_Init();
  AE_HX711_Reset();
  offset = AE_HX711_getGram(30); 
  prev = offset;
}


void loop() 
{ 
  float data;
  char S1[20];
  char s[20];
  // Serial.print("now: ");
  // Serial.println(AE_HX711_getGram(5) - offset);
  // Serial.println(prev - offset);
  if(AE_HX711_getGram(5) - prev > 0.1){
    while(!stable());
    Serial.print(AE_HX711_getGram(5) - prev);
    Serial.println("e");
    prev = AE_HX711_getGram(5);
  }
}



void AE_HX711_Init(void)
{
  pinMode(pin_slk, OUTPUT);
  pinMode(pin_dout, INPUT);
}

void AE_HX711_Reset(void)
{
  digitalWrite(pin_slk,1);
  delayMicroseconds(100);
  digitalWrite(pin_slk,0);
  delayMicroseconds(100); 
}

long AE_HX711_Read(void)
{
  long data=0;
  while(digitalRead(pin_dout)!=0);
  delayMicroseconds(10);
  for(int i=0;i<24;i++)
  {
    digitalWrite(pin_slk,1);
    delayMicroseconds(5);
    digitalWrite(pin_slk,0);
    delayMicroseconds(5);
    data = (data<<1)|(digitalRead(pin_dout));
  }
  //Serial.println(data,HEX);   
  digitalWrite(pin_slk,1);
  delayMicroseconds(10);
  digitalWrite(pin_slk,0);
  delayMicroseconds(10);
  return data^0x800000; 
}


long AE_HX711_Averaging(long adc,char num)
{
  long sum = 0;
  for (int i = 0; i < num; i++) sum += AE_HX711_Read();
  return sum / num;
}

float AE_HX711_getGram(char num)
{
  #define HX711_R1  20000.0f
  #define HX711_R2  8200.0f
  #define HX711_VBG 1.25f
  #define HX711_AVDD      4.2987f//(HX711_VBG*((HX711_R1+HX711_R2)/HX711_R2))
  #define HX711_ADC1bit   HX711_AVDD/16777216 //16777216=(2^24)
  #define HX711_PGA 128
  #define HX711_SCALE     (OUT_VOL * HX711_AVDD / LOAD *HX711_PGA)
  
  float data;

  data = AE_HX711_Averaging(AE_HX711_Read(),num)*HX711_ADC1bit; 
  //Serial.println( HX711_AVDD);   
  //Serial.println( HX711_ADC1bit);   
  //Serial.println( HX711_SCALE);   
  //Serial.println( data);   
  data =  data / HX711_SCALE;


  return data;
}

bool stable(){
  float v = AE_HX711_getGram(5);
  bool ok = true;
  for(int i = 0; i < 3; i++){
    if(abs(v - AE_HX711_getGram(5)) > eps) ok = false;
  }
  return ok;
}
