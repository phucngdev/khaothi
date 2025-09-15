/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TestCategoryEntity = {
  id: string;
  name: string;
  imageUrl: string;
  numberOfTests: number;
  numberOfParticipants: number;
  spesifictUser: TestCategoryEntity.spesifictUser;
  classIds: Array<string>;
  userIds: Array<string>;
};

export namespace TestCategoryEntity {

  export enum spesifictUser {
    ALL = 'ALL',
    CLASS = 'CLASS',
    USERS = 'USERS',
    COURSE = 'COURSE',
  }


}

