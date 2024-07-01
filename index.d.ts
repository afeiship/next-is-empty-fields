type ValuesType = Record<string, any> | any[];
interface NxStatic {
  isEmptyFields: (values: ValuesType) => boolean;
}
