const KEY = 'lms-demo:commitment:v1';

export function getCommitmentCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEY) === 'true';
}

export function setCommitmentCompleted(): void {
  localStorage.setItem(KEY, 'true');
}
