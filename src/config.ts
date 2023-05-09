export const currentYear = new Date().getFullYear();
export type Actividad = {
  value: string;
  label: string;
};
export const activities = [
  { value: 'running', label: 'Correr' },
  { value: 'rock climbing', label: 'Escalar' },
  { value: 'swimming', label: 'Nadar' },
  { value: 'yoga', label: 'Yoga' },
];
