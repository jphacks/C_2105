export const imgNamePicker = (imgUrl: string): string => {
  const img = imgUrl.split('/')
  const name = img[1].split('.')

  return name[0]
}
