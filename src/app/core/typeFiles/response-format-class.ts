export class responseFormat {

    constructor(
      public statusCode: number,
      public name: string,
      public message: string,
      public code: string,
      public stack: string
    ) {  }
  }

