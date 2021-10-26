const int ANALOG_PINS[] = [0, 1, 2, 3, 4, 5];

int prev_values[] = [0, 0, 0, 0, 0, 0];

// 許容誤差
const EPS = 100;

// 何ループ入力がなければ投入終了とするか
const FINISH_COUNT = 1000;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(10);
  for(int i = 0; i < 6; i++){
    prev_values[ANALOG_PINS[i]] = analogRead(ANALOG_PINS[i]);
  }
}

int cnt = 0; // 入力に変化がないループの数
bool start_flg = false;

void loop() {
  bool changed = false;
  // put your main code here, to run repeatedly:
  for(int i = 0; i < 6; i++){
    int v = analogRead(ANALOG_PINS[i]);
    if(abs(v - prev_values[i]) > EPS){
      // コインが通過した
      Serial.print(i);
      changed = true;
      start_flg = true;
      cnt = 0;
    }
    prev_values[i] = v;
  }
  if(start_flg && !changed){
    cnt++;
    if(cnt > FINISH_COUNT){
      // 終了判定
      Serial.print("end");
      start_flg = false;
      cnt = 0;
    }
  }
}
