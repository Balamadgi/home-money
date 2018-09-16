export class EventModel {
  constructor(
    public idOfCategory: number,
    public typeOfEvent: string,
    public amount: number,
    public date: Date,
    public description: string,
		public id?: number,
		public categoryName?: string
  ) {
  }
}
