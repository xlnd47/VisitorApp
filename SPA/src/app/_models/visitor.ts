export interface Visitor {
  id: number;
  visitType: number;
  firstName: string;
  lastName: string;
  company?: string;
  numberPlate?: string;
  visitBegin: Date;
  visitEnd?: Date;
}
