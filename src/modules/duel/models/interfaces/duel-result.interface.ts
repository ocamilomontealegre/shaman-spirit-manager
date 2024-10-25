interface IScore {
  readonly shamanOne: number;
  readonly shamanTwo: number;
}

export interface IDuelResult {
  readonly winner: string;
  readonly score: IScore;
  readonly duration: string;
}
