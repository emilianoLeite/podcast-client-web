// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */
declare module 'react-native-rss-parser' {
  type Maybe<T> = T | undefined;

  interface IFeedItem {
    id: string;
    title: string;
    links: {
      url: string;
      rel: string;
    }[];
    description: string;
    content: string;
    authors: Maybe<{ name: string; }>[];
    categories: Maybe<{ name: string; }>[];
    published: string;
    enclosures: {
      url: string;
      length: string;
      mimeType: string;
    }[];
    itunes: any;
  }

  interface IFeed {
    type: string;
    title: string;
    links: {
      url: string;
      rel: string;
    }[];
    description: string;
    language: string;
    copyright: Maybe<string>;
    authors: Maybe<{ name: string; }>[];
    lastUpdated: string;
    lastPublished: string;
    categories: Maybe<{ name: string; }>[];
    image: {
      title: string;
      description: Maybe<string>;
      url: string;
      height: Maybe<string>;
      width: Maybe<string>;
    };
    itunes: any;
    items: IFeedItem[];
  }

  export function parse(feedUrl: string): Promise<IFeed>;
}


/*~ If this module has methods, declare them as functions like so.
 */
// export function myMethod(a: string): string;
// export function myOtherMethod(a: number): number;

// /*~ You can declare types that are available via importing the module */
// export interface someType {
//   name: string;
//   length: number;
//   extras?: string[];
// }

// /*~ You can declare properties of the module using const, let, or var */
// export const myField: number;

// /*~ If there are types, properties, or methods inside dotted names
//  *~ of the module, declare them inside a 'namespace'.
//  */
// export namespace subProp {
//   /*~ For example, given this definition, someone could write:
//    *~   import { subProp } from 'yourModule';
//    *~   subProp.foo();
//    *~ or
//    *~   import * as yourMod from 'yourModule';
//    *~   yourMod.subProp.foo();
//    */
//   export function foo(): void;
// }
