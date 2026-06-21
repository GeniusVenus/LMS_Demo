const BASE = 'https://hcm44.sapsf.com/public/ui-resource/militaryco';

export type UpdateCard = {
  id: string;
  title: string;
  image: string;
};

export const UPDATE_CARDS: UpdateCard[] = [
  {
    id: 'demand',
    title: 'Học tập theo yêu cầu',
    image: `${BASE}/657;mod=c8e9ab7fd2850bae4fb6355260a99e1c&resize=wsx`,
  },
  {
    id: 'proactive',
    title: 'Học tập chủ động',
    image: `${BASE}/658;mod=28f1f2cac888564aa2c7a354e0c33254&resize=wsx`,
  },
  {
    id: 'nano',
    title: 'Nano Learning Series',
    image: `${BASE}/736;mod=ecb611bc80b027080b133f57ceeb8c46&resize=wsx`,
  },
  {
    id: 'magazine',
    title: 'Tạp chí học tập MB',
    image: `${BASE}/738;mod=5a43f5b59cb2ac6775c7bf11ac981e67&resize=wsx`,
  },
];

export const GREETING_NAME = 'Nguyễn Xuân Hương';
export const GREETING_BG =
  'https://hcm44.sapsf.com/public/ui-resource/militaryco/756;mod=71efcb7b0bb69124e8940df14f104f82';
