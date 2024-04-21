export default function getDateNow(ParamDate: Date): string {
  console.log('ParamDate', ParamDate);
  // // Mendapatkan tanggal
  const tanggal: number = ParamDate.getDate();
  return `${tanggal}`;
}

export function getTimeNow(ParamDate: Date): string {
  // Mendapatkan jam
  const jam: number = ParamDate.getHours();

  // Mendapatkan menit
  const menit: number = ParamDate.getMinutes();

  // Mendapatkan detik
  const detik: number = ParamDate.getSeconds();

  // Membuat string yang berisi tanggal dan waktu
  const timeString = `${jam}:${menit}:${detik}`;

  return timeString;
}

export function getDateTimeNow(ParamDate: Date): string {
  // Mendapatkan tanggal
  const tanggal: number = ParamDate.getDate();

  // Mendapatkan bulan (perhatikan bahwa bulan dimulai dari 0)
  const bulan: number = ParamDate.getMonth() + 1;

  // Mendapatkan tahun
  const tahun: number = ParamDate.getFullYear();

  // Mendapatkan jam
  const jam: number = ParamDate.getHours();

  // Mendapatkan menit
  const menit: number = ParamDate.getMinutes();

  // Mendapatkan detik
  const detik: number = ParamDate.getSeconds();

  // Membuat string yang berisi tanggal dan waktu
  const dateTimeString = `${tanggal}/${bulan}/${tahun} ${jam}:${menit}:${detik}`;

  return dateTimeString;
}
