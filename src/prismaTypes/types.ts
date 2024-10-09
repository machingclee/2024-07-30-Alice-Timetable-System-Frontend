// @ts-nocheck

/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>
/**
 * Model Portfolio_to_art_photo
 * 
 */
export type Portfolio_to_art_photo = $Result.DefaultSelection<Prisma.$Portfolio_to_art_photoPayload>
/**
 * Model Login_session
 * 
 */
export type Login_session = $Result.DefaultSelection<Prisma.$Login_sessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model Student_package
 * 
 */
export type Student_package = $Result.DefaultSelection<Prisma.$Student_packagePayload>
/**
 * Model Class_group
 * 
 */
export type Class_group = $Result.DefaultSelection<Prisma.$Class_groupPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const Role: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  STUDENT: 'STUDENT'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Class_status: {
  PRESENT: 'PRESENT',
  ILLEGIT_ABSENCE: 'ILLEGIT_ABSENCE',
  SUSPICIOUS_ABSENCE: 'SUSPICIOUS_ABSENCE',
  LEGIT_ABSENCE: 'LEGIT_ABSENCE',
  MAKEUP: 'MAKEUP'
};

export type Class_status = (typeof Class_status)[keyof typeof Class_status]


export const Classroom: {
  PRINCE_EDWARD: 'PRINCE_EDWARD',
  CAUSEWAY_BAY: 'CAUSEWAY_BAY'
};

export type Classroom = (typeof Classroom)[keyof typeof Classroom]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Class_status = $Enums.Class_status

export const Class_status: typeof $Enums.Class_status

export type Classroom = $Enums.Classroom

export const Classroom: typeof $Enums.Classroom

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolios
    * const portfolios = await prisma.portfolio.findMany()
    * ```
    */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs>;

  /**
   * `prisma.portfolio_to_art_photo`: Exposes CRUD operations for the **Portfolio_to_art_photo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolio_to_art_photos
    * const portfolio_to_art_photos = await prisma.portfolio_to_art_photo.findMany()
    * ```
    */
  get portfolio_to_art_photo(): Prisma.Portfolio_to_art_photoDelegate<ExtArgs>;

  /**
   * `prisma.login_session`: Exposes CRUD operations for the **Login_session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Login_sessions
    * const login_sessions = await prisma.login_session.findMany()
    * ```
    */
  get login_session(): Prisma.Login_sessionDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs>;

  /**
   * `prisma.student_package`: Exposes CRUD operations for the **Student_package** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Student_packages
    * const student_packages = await prisma.student_package.findMany()
    * ```
    */
  get student_package(): Prisma.Student_packageDelegate<ExtArgs>;

  /**
   * `prisma.class_group`: Exposes CRUD operations for the **Class_group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Class_groups
    * const class_groups = await prisma.class_group.findMany()
    * ```
    */
  get class_group(): Prisma.Class_groupDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.17.0
   * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Student: 'Student',
    Portfolio: 'Portfolio',
    Portfolio_to_art_photo: 'Portfolio_to_art_photo',
    Login_session: 'Login_session',
    User: 'User',
    Course: 'Course',
    Class: 'Class',
    Student_package: 'Student_package',
    Class_group: 'Class_group'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "student" | "portfolio" | "portfolio_to_art_photo" | "login_session" | "user" | "course" | "class" | "student_package" | "class_group"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>
        fields: Prisma.PortfolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio>
          }
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number
          }
        }
      }
      Portfolio_to_art_photo: {
        payload: Prisma.$Portfolio_to_art_photoPayload<ExtArgs>
        fields: Prisma.Portfolio_to_art_photoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Portfolio_to_art_photoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Portfolio_to_art_photoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload>
          }
          findFirst: {
            args: Prisma.Portfolio_to_art_photoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Portfolio_to_art_photoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload>
          }
          findMany: {
            args: Prisma.Portfolio_to_art_photoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload>[]
          }
          create: {
            args: Prisma.Portfolio_to_art_photoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload>
          }
          createMany: {
            args: Prisma.Portfolio_to_art_photoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Portfolio_to_art_photoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload>[]
          }
          delete: {
            args: Prisma.Portfolio_to_art_photoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload>
          }
          update: {
            args: Prisma.Portfolio_to_art_photoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload>
          }
          deleteMany: {
            args: Prisma.Portfolio_to_art_photoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Portfolio_to_art_photoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Portfolio_to_art_photoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Portfolio_to_art_photoPayload>
          }
          aggregate: {
            args: Prisma.Portfolio_to_art_photoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio_to_art_photo>
          }
          groupBy: {
            args: Prisma.Portfolio_to_art_photoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Portfolio_to_art_photoGroupByOutputType>[]
          }
          count: {
            args: Prisma.Portfolio_to_art_photoCountArgs<ExtArgs>
            result: $Utils.Optional<Portfolio_to_art_photoCountAggregateOutputType> | number
          }
        }
      }
      Login_session: {
        payload: Prisma.$Login_sessionPayload<ExtArgs>
        fields: Prisma.Login_sessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Login_sessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Login_sessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload>
          }
          findFirst: {
            args: Prisma.Login_sessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Login_sessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload>
          }
          findMany: {
            args: Prisma.Login_sessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload>[]
          }
          create: {
            args: Prisma.Login_sessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload>
          }
          createMany: {
            args: Prisma.Login_sessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Login_sessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload>[]
          }
          delete: {
            args: Prisma.Login_sessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload>
          }
          update: {
            args: Prisma.Login_sessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload>
          }
          deleteMany: {
            args: Prisma.Login_sessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Login_sessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Login_sessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Login_sessionPayload>
          }
          aggregate: {
            args: Prisma.Login_sessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogin_session>
          }
          groupBy: {
            args: Prisma.Login_sessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Login_sessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.Login_sessionCountArgs<ExtArgs>
            result: $Utils.Optional<Login_sessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      Student_package: {
        payload: Prisma.$Student_packagePayload<ExtArgs>
        fields: Prisma.Student_packageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Student_packageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Student_packageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload>
          }
          findFirst: {
            args: Prisma.Student_packageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Student_packageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload>
          }
          findMany: {
            args: Prisma.Student_packageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload>[]
          }
          create: {
            args: Prisma.Student_packageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload>
          }
          createMany: {
            args: Prisma.Student_packageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Student_packageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload>[]
          }
          delete: {
            args: Prisma.Student_packageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload>
          }
          update: {
            args: Prisma.Student_packageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload>
          }
          deleteMany: {
            args: Prisma.Student_packageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Student_packageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Student_packageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Student_packagePayload>
          }
          aggregate: {
            args: Prisma.Student_packageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent_package>
          }
          groupBy: {
            args: Prisma.Student_packageGroupByArgs<ExtArgs>
            result: $Utils.Optional<Student_packageGroupByOutputType>[]
          }
          count: {
            args: Prisma.Student_packageCountArgs<ExtArgs>
            result: $Utils.Optional<Student_packageCountAggregateOutputType> | number
          }
        }
      }
      Class_group: {
        payload: Prisma.$Class_groupPayload<ExtArgs>
        fields: Prisma.Class_groupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Class_groupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Class_groupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload>
          }
          findFirst: {
            args: Prisma.Class_groupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Class_groupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload>
          }
          findMany: {
            args: Prisma.Class_groupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload>[]
          }
          create: {
            args: Prisma.Class_groupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload>
          }
          createMany: {
            args: Prisma.Class_groupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Class_groupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload>[]
          }
          delete: {
            args: Prisma.Class_groupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload>
          }
          update: {
            args: Prisma.Class_groupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload>
          }
          deleteMany: {
            args: Prisma.Class_groupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Class_groupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Class_groupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_groupPayload>
          }
          aggregate: {
            args: Prisma.Class_groupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass_group>
          }
          groupBy: {
            args: Prisma.Class_groupGroupByArgs<ExtArgs>
            result: $Utils.Optional<Class_groupGroupByOutputType>[]
          }
          count: {
            args: Prisma.Class_groupCountArgs<ExtArgs>
            result: $Utils.Optional<Class_groupCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    Portfolio: number
    Student_package: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Portfolio?: boolean | StudentCountOutputTypeCountPortfolioArgs
    Student_package?: boolean | StudentCountOutputTypeCountStudent_packageArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountPortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountStudent_packageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Student_packageWhereInput
  }


  /**
   * Count Type PortfolioCountOutputType
   */

  export type PortfolioCountOutputType = {
    PortfolioToArtPicture: number
  }

  export type PortfolioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PortfolioToArtPicture?: boolean | PortfolioCountOutputTypeCountPortfolioToArtPictureArgs
  }

  // Custom InputTypes
  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioCountOutputType
     */
    select?: PortfolioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountPortfolioToArtPictureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Portfolio_to_art_photoWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    Student_package: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Student_package?: boolean | CourseCountOutputTypeCountStudent_packageArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountStudent_packageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Student_packageWhereInput
  }


  /**
   * Count Type Student_packageCountOutputType
   */

  export type Student_packageCountOutputType = {
    Class: number
  }

  export type Student_packageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Class?: boolean | Student_packageCountOutputTypeCountClassArgs
  }

  // Custom InputTypes
  /**
   * Student_packageCountOutputType without action
   */
  export type Student_packageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_packageCountOutputType
     */
    select?: Student_packageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Student_packageCountOutputType without action
   */
  export type Student_packageCountOutputTypeCountClassArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
  }


  /**
   * Count Type Class_groupCountOutputType
   */

  export type Class_groupCountOutputType = {
    GroupOfClasses: number
  }

  export type Class_groupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GroupOfClasses?: boolean | Class_groupCountOutputTypeCountGroupOfClassesArgs
  }

  // Custom InputTypes
  /**
   * Class_groupCountOutputType without action
   */
  export type Class_groupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_groupCountOutputType
     */
    select?: Class_groupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Class_groupCountOutputType without action
   */
  export type Class_groupCountOutputTypeCountGroupOfClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    birthdate: number | null
    created_at: number | null
  }

  export type StudentSumAggregateOutputType = {
    birthdate: number | null
    created_at: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    chinese_name: string | null
    gender: $Enums.Gender | null
    school_name: string | null
    grade: string | null
    phone_number: string | null
    wechat_id: string | null
    birthdate: number | null
    parent_email: string | null
    created_at: number | null
    created_at_hk: string | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    chinese_name: string | null
    gender: $Enums.Gender | null
    school_name: string | null
    grade: string | null
    phone_number: string | null
    wechat_id: string | null
    birthdate: number | null
    parent_email: string | null
    created_at: number | null
    created_at_hk: string | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    chinese_name: number
    gender: number
    school_name: number
    grade: number
    phone_number: number
    wechat_id: number
    birthdate: number
    parent_email: number
    created_at: number
    created_at_hk: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    birthdate?: true
    created_at?: true
  }

  export type StudentSumAggregateInputType = {
    birthdate?: true
    created_at?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    chinese_name?: true
    gender?: true
    school_name?: true
    grade?: true
    phone_number?: true
    wechat_id?: true
    birthdate?: true
    parent_email?: true
    created_at?: true
    created_at_hk?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    chinese_name?: true
    gender?: true
    school_name?: true
    grade?: true
    phone_number?: true
    wechat_id?: true
    birthdate?: true
    parent_email?: true
    created_at?: true
    created_at_hk?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    chinese_name?: true
    gender?: true
    school_name?: true
    grade?: true
    phone_number?: true
    wechat_id?: true
    birthdate?: true
    parent_email?: true
    created_at?: true
    created_at_hk?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    first_name: string
    last_name: string
    chinese_name: string | null
    gender: $Enums.Gender
    school_name: string
    grade: string
    phone_number: string | null
    wechat_id: string | null
    birthdate: number
    parent_email: string
    created_at: number
    created_at_hk: string
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    chinese_name?: boolean
    gender?: boolean
    school_name?: boolean
    grade?: boolean
    phone_number?: boolean
    wechat_id?: boolean
    birthdate?: boolean
    parent_email?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    Portfolio?: boolean | Student$PortfolioArgs<ExtArgs>
    Student_package?: boolean | Student$Student_packageArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    chinese_name?: boolean
    gender?: boolean
    school_name?: boolean
    grade?: boolean
    phone_number?: boolean
    wechat_id?: boolean
    birthdate?: boolean
    parent_email?: boolean
    created_at?: boolean
    created_at_hk?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    chinese_name?: boolean
    gender?: boolean
    school_name?: boolean
    grade?: boolean
    phone_number?: boolean
    wechat_id?: boolean
    birthdate?: boolean
    parent_email?: boolean
    created_at?: boolean
    created_at_hk?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Portfolio?: boolean | Student$PortfolioArgs<ExtArgs>
    Student_package?: boolean | Student$Student_packageArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      Portfolio: Prisma.$PortfolioPayload<ExtArgs>[]
      Student_package: Prisma.$Student_packagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      first_name: string
      last_name: string
      chinese_name: string | null
      gender: $Enums.Gender
      school_name: string
      grade: string
      phone_number: string | null
      wechat_id: string | null
      birthdate: number
      parent_email: string
      created_at: number
      created_at_hk: string
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Portfolio<T extends Student$PortfolioArgs<ExtArgs> = {}>(args?: Subset<T, Student$PortfolioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany"> | Null>
    Student_package<T extends Student$Student_packageArgs<ExtArgs> = {}>(args?: Subset<T, Student$Student_packageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly first_name: FieldRef<"Student", 'String'>
    readonly last_name: FieldRef<"Student", 'String'>
    readonly chinese_name: FieldRef<"Student", 'String'>
    readonly gender: FieldRef<"Student", 'Gender'>
    readonly school_name: FieldRef<"Student", 'String'>
    readonly grade: FieldRef<"Student", 'String'>
    readonly phone_number: FieldRef<"Student", 'String'>
    readonly wechat_id: FieldRef<"Student", 'String'>
    readonly birthdate: FieldRef<"Student", 'Float'>
    readonly parent_email: FieldRef<"Student", 'String'>
    readonly created_at: FieldRef<"Student", 'Float'>
    readonly created_at_hk: FieldRef<"Student", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student.Portfolio
   */
  export type Student$PortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Student.Student_package
   */
  export type Student$Student_packageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    where?: Student_packageWhereInput
    orderBy?: Student_packageOrderByWithRelationInput | Student_packageOrderByWithRelationInput[]
    cursor?: Student_packageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Student_packageScalarFieldEnum | Student_packageScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null
    _avg: PortfolioAvgAggregateOutputType | null
    _sum: PortfolioSumAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  export type PortfolioAvgAggregateOutputType = {
    created_at: number | null
  }

  export type PortfolioSumAggregateOutputType = {
    created_at: number | null
  }

  export type PortfolioMinAggregateOutputType = {
    id: string | null
    student_id: string | null
    name: string | null
    created_at: number | null
    created_at_hk: string | null
  }

  export type PortfolioMaxAggregateOutputType = {
    id: string | null
    student_id: string | null
    name: string | null
    created_at: number | null
    created_at_hk: string | null
  }

  export type PortfolioCountAggregateOutputType = {
    id: number
    student_id: number
    name: number
    created_at: number
    created_at_hk: number
    _all: number
  }


  export type PortfolioAvgAggregateInputType = {
    created_at?: true
  }

  export type PortfolioSumAggregateInputType = {
    created_at?: true
  }

  export type PortfolioMinAggregateInputType = {
    id?: true
    student_id?: true
    name?: true
    created_at?: true
    created_at_hk?: true
  }

  export type PortfolioMaxAggregateInputType = {
    id?: true
    student_id?: true
    name?: true
    created_at?: true
    created_at_hk?: true
  }

  export type PortfolioCountAggregateInputType = {
    id?: true
    student_id?: true
    name?: true
    created_at?: true
    created_at_hk?: true
    _all?: true
  }

  export type PortfolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolios
    **/
    _count?: true | PortfolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioMaxAggregateInputType
  }

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>
  }




  export type PortfolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithAggregationInput | PortfolioOrderByWithAggregationInput[]
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum
    having?: PortfolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioCountAggregateInputType | true
    _avg?: PortfolioAvgAggregateInputType
    _sum?: PortfolioSumAggregateInputType
    _min?: PortfolioMinAggregateInputType
    _max?: PortfolioMaxAggregateInputType
  }

  export type PortfolioGroupByOutputType = {
    id: string
    student_id: string
    name: string
    created_at: number
    created_at_hk: string
    _count: PortfolioCountAggregateOutputType | null
    _avg: PortfolioAvgAggregateOutputType | null
    _sum: PortfolioSumAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    name?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    Student?: boolean | StudentDefaultArgs<ExtArgs>
    PortfolioToArtPicture?: boolean | Portfolio$PortfolioToArtPictureArgs<ExtArgs>
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    name?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    Student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectScalar = {
    id?: boolean
    student_id?: boolean
    name?: boolean
    created_at?: boolean
    created_at_hk?: boolean
  }

  export type PortfolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Student?: boolean | StudentDefaultArgs<ExtArgs>
    PortfolioToArtPicture?: boolean | Portfolio$PortfolioToArtPictureArgs<ExtArgs>
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PortfolioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $PortfolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio"
    objects: {
      Student: Prisma.$StudentPayload<ExtArgs>
      PortfolioToArtPicture: Prisma.$Portfolio_to_art_photoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      student_id: string
      name: string
      created_at: number
      created_at_hk: string
    }, ExtArgs["result"]["portfolio"]>
    composites: {}
  }

  type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = $Result.GetResult<Prisma.$PortfolioPayload, S>

  type PortfolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PortfolioCountAggregateInputType | true
    }

  export interface PortfolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'], meta: { name: 'Portfolio' } }
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     * 
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioFindManyArgs>(args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     * 
     */
    create<T extends PortfolioCreateArgs>(args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioCreateManyArgs>(args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portfolios and returns the data saved in the database.
     * @param {PortfolioCreateManyAndReturnArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     * 
     */
    delete<T extends PortfolioDeleteArgs>(args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioUpdateArgs>(args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioUpdateManyArgs>(args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
    **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioAggregateArgs>(args: Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio model
   */
  readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    PortfolioToArtPicture<T extends Portfolio$PortfolioToArtPictureArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$PortfolioToArtPictureArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portfolio model
   */ 
  interface PortfolioFieldRefs {
    readonly id: FieldRef<"Portfolio", 'String'>
    readonly student_id: FieldRef<"Portfolio", 'String'>
    readonly name: FieldRef<"Portfolio", 'String'>
    readonly created_at: FieldRef<"Portfolio", 'Float'>
    readonly created_at_hk: FieldRef<"Portfolio", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio.
     */
    data: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
  }

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Portfolio createManyAndReturn
   */
  export type PortfolioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
  }

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
  }

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput
  }

  /**
   * Portfolio.PortfolioToArtPicture
   */
  export type Portfolio$PortfolioToArtPictureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    where?: Portfolio_to_art_photoWhereInput
    orderBy?: Portfolio_to_art_photoOrderByWithRelationInput | Portfolio_to_art_photoOrderByWithRelationInput[]
    cursor?: Portfolio_to_art_photoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Portfolio_to_art_photoScalarFieldEnum | Portfolio_to_art_photoScalarFieldEnum[]
  }

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio_to_art_photo
   */

  export type AggregatePortfolio_to_art_photo = {
    _count: Portfolio_to_art_photoCountAggregateOutputType | null
    _avg: Portfolio_to_art_photoAvgAggregateOutputType | null
    _sum: Portfolio_to_art_photoSumAggregateOutputType | null
    _min: Portfolio_to_art_photoMinAggregateOutputType | null
    _max: Portfolio_to_art_photoMaxAggregateOutputType | null
  }

  export type Portfolio_to_art_photoAvgAggregateOutputType = {
    id: number | null
  }

  export type Portfolio_to_art_photoSumAggregateOutputType = {
    id: number | null
  }

  export type Portfolio_to_art_photoMinAggregateOutputType = {
    id: number | null
    portfolio_id: string | null
    photo_url: string | null
    photo_desc: string | null
  }

  export type Portfolio_to_art_photoMaxAggregateOutputType = {
    id: number | null
    portfolio_id: string | null
    photo_url: string | null
    photo_desc: string | null
  }

  export type Portfolio_to_art_photoCountAggregateOutputType = {
    id: number
    portfolio_id: number
    photo_url: number
    photo_desc: number
    _all: number
  }


  export type Portfolio_to_art_photoAvgAggregateInputType = {
    id?: true
  }

  export type Portfolio_to_art_photoSumAggregateInputType = {
    id?: true
  }

  export type Portfolio_to_art_photoMinAggregateInputType = {
    id?: true
    portfolio_id?: true
    photo_url?: true
    photo_desc?: true
  }

  export type Portfolio_to_art_photoMaxAggregateInputType = {
    id?: true
    portfolio_id?: true
    photo_url?: true
    photo_desc?: true
  }

  export type Portfolio_to_art_photoCountAggregateInputType = {
    id?: true
    portfolio_id?: true
    photo_url?: true
    photo_desc?: true
    _all?: true
  }

  export type Portfolio_to_art_photoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio_to_art_photo to aggregate.
     */
    where?: Portfolio_to_art_photoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolio_to_art_photos to fetch.
     */
    orderBy?: Portfolio_to_art_photoOrderByWithRelationInput | Portfolio_to_art_photoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Portfolio_to_art_photoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolio_to_art_photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolio_to_art_photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolio_to_art_photos
    **/
    _count?: true | Portfolio_to_art_photoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Portfolio_to_art_photoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Portfolio_to_art_photoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Portfolio_to_art_photoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Portfolio_to_art_photoMaxAggregateInputType
  }

  export type GetPortfolio_to_art_photoAggregateType<T extends Portfolio_to_art_photoAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio_to_art_photo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio_to_art_photo[P]>
      : GetScalarType<T[P], AggregatePortfolio_to_art_photo[P]>
  }




  export type Portfolio_to_art_photoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Portfolio_to_art_photoWhereInput
    orderBy?: Portfolio_to_art_photoOrderByWithAggregationInput | Portfolio_to_art_photoOrderByWithAggregationInput[]
    by: Portfolio_to_art_photoScalarFieldEnum[] | Portfolio_to_art_photoScalarFieldEnum
    having?: Portfolio_to_art_photoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Portfolio_to_art_photoCountAggregateInputType | true
    _avg?: Portfolio_to_art_photoAvgAggregateInputType
    _sum?: Portfolio_to_art_photoSumAggregateInputType
    _min?: Portfolio_to_art_photoMinAggregateInputType
    _max?: Portfolio_to_art_photoMaxAggregateInputType
  }

  export type Portfolio_to_art_photoGroupByOutputType = {
    id: number
    portfolio_id: string
    photo_url: string
    photo_desc: string
    _count: Portfolio_to_art_photoCountAggregateOutputType | null
    _avg: Portfolio_to_art_photoAvgAggregateOutputType | null
    _sum: Portfolio_to_art_photoSumAggregateOutputType | null
    _min: Portfolio_to_art_photoMinAggregateOutputType | null
    _max: Portfolio_to_art_photoMaxAggregateOutputType | null
  }

  type GetPortfolio_to_art_photoGroupByPayload<T extends Portfolio_to_art_photoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Portfolio_to_art_photoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Portfolio_to_art_photoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Portfolio_to_art_photoGroupByOutputType[P]>
            : GetScalarType<T[P], Portfolio_to_art_photoGroupByOutputType[P]>
        }
      >
    >


  export type Portfolio_to_art_photoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    photo_url?: boolean
    photo_desc?: boolean
    Portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio_to_art_photo"]>

  export type Portfolio_to_art_photoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    photo_url?: boolean
    photo_desc?: boolean
    Portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio_to_art_photo"]>

  export type Portfolio_to_art_photoSelectScalar = {
    id?: boolean
    portfolio_id?: boolean
    photo_url?: boolean
    photo_desc?: boolean
  }

  export type Portfolio_to_art_photoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type Portfolio_to_art_photoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }

  export type $Portfolio_to_art_photoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio_to_art_photo"
    objects: {
      Portfolio: Prisma.$PortfolioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      portfolio_id: string
      photo_url: string
      photo_desc: string
    }, ExtArgs["result"]["portfolio_to_art_photo"]>
    composites: {}
  }

  type Portfolio_to_art_photoGetPayload<S extends boolean | null | undefined | Portfolio_to_art_photoDefaultArgs> = $Result.GetResult<Prisma.$Portfolio_to_art_photoPayload, S>

  type Portfolio_to_art_photoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<Portfolio_to_art_photoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Portfolio_to_art_photoCountAggregateInputType | true
    }

  export interface Portfolio_to_art_photoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio_to_art_photo'], meta: { name: 'Portfolio_to_art_photo' } }
    /**
     * Find zero or one Portfolio_to_art_photo that matches the filter.
     * @param {Portfolio_to_art_photoFindUniqueArgs} args - Arguments to find a Portfolio_to_art_photo
     * @example
     * // Get one Portfolio_to_art_photo
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Portfolio_to_art_photoFindUniqueArgs>(args: SelectSubset<T, Portfolio_to_art_photoFindUniqueArgs<ExtArgs>>): Prisma__Portfolio_to_art_photoClient<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Portfolio_to_art_photo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {Portfolio_to_art_photoFindUniqueOrThrowArgs} args - Arguments to find a Portfolio_to_art_photo
     * @example
     * // Get one Portfolio_to_art_photo
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Portfolio_to_art_photoFindUniqueOrThrowArgs>(args: SelectSubset<T, Portfolio_to_art_photoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Portfolio_to_art_photoClient<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Portfolio_to_art_photo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Portfolio_to_art_photoFindFirstArgs} args - Arguments to find a Portfolio_to_art_photo
     * @example
     * // Get one Portfolio_to_art_photo
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Portfolio_to_art_photoFindFirstArgs>(args?: SelectSubset<T, Portfolio_to_art_photoFindFirstArgs<ExtArgs>>): Prisma__Portfolio_to_art_photoClient<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Portfolio_to_art_photo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Portfolio_to_art_photoFindFirstOrThrowArgs} args - Arguments to find a Portfolio_to_art_photo
     * @example
     * // Get one Portfolio_to_art_photo
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Portfolio_to_art_photoFindFirstOrThrowArgs>(args?: SelectSubset<T, Portfolio_to_art_photoFindFirstOrThrowArgs<ExtArgs>>): Prisma__Portfolio_to_art_photoClient<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Portfolio_to_art_photos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Portfolio_to_art_photoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolio_to_art_photos
     * const portfolio_to_art_photos = await prisma.portfolio_to_art_photo.findMany()
     * 
     * // Get first 10 Portfolio_to_art_photos
     * const portfolio_to_art_photos = await prisma.portfolio_to_art_photo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolio_to_art_photoWithIdOnly = await prisma.portfolio_to_art_photo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Portfolio_to_art_photoFindManyArgs>(args?: SelectSubset<T, Portfolio_to_art_photoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Portfolio_to_art_photo.
     * @param {Portfolio_to_art_photoCreateArgs} args - Arguments to create a Portfolio_to_art_photo.
     * @example
     * // Create one Portfolio_to_art_photo
     * const Portfolio_to_art_photo = await prisma.portfolio_to_art_photo.create({
     *   data: {
     *     // ... data to create a Portfolio_to_art_photo
     *   }
     * })
     * 
     */
    create<T extends Portfolio_to_art_photoCreateArgs>(args: SelectSubset<T, Portfolio_to_art_photoCreateArgs<ExtArgs>>): Prisma__Portfolio_to_art_photoClient<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Portfolio_to_art_photos.
     * @param {Portfolio_to_art_photoCreateManyArgs} args - Arguments to create many Portfolio_to_art_photos.
     * @example
     * // Create many Portfolio_to_art_photos
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Portfolio_to_art_photoCreateManyArgs>(args?: SelectSubset<T, Portfolio_to_art_photoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portfolio_to_art_photos and returns the data saved in the database.
     * @param {Portfolio_to_art_photoCreateManyAndReturnArgs} args - Arguments to create many Portfolio_to_art_photos.
     * @example
     * // Create many Portfolio_to_art_photos
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portfolio_to_art_photos and only return the `id`
     * const portfolio_to_art_photoWithIdOnly = await prisma.portfolio_to_art_photo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Portfolio_to_art_photoCreateManyAndReturnArgs>(args?: SelectSubset<T, Portfolio_to_art_photoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Portfolio_to_art_photo.
     * @param {Portfolio_to_art_photoDeleteArgs} args - Arguments to delete one Portfolio_to_art_photo.
     * @example
     * // Delete one Portfolio_to_art_photo
     * const Portfolio_to_art_photo = await prisma.portfolio_to_art_photo.delete({
     *   where: {
     *     // ... filter to delete one Portfolio_to_art_photo
     *   }
     * })
     * 
     */
    delete<T extends Portfolio_to_art_photoDeleteArgs>(args: SelectSubset<T, Portfolio_to_art_photoDeleteArgs<ExtArgs>>): Prisma__Portfolio_to_art_photoClient<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Portfolio_to_art_photo.
     * @param {Portfolio_to_art_photoUpdateArgs} args - Arguments to update one Portfolio_to_art_photo.
     * @example
     * // Update one Portfolio_to_art_photo
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Portfolio_to_art_photoUpdateArgs>(args: SelectSubset<T, Portfolio_to_art_photoUpdateArgs<ExtArgs>>): Prisma__Portfolio_to_art_photoClient<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Portfolio_to_art_photos.
     * @param {Portfolio_to_art_photoDeleteManyArgs} args - Arguments to filter Portfolio_to_art_photos to delete.
     * @example
     * // Delete a few Portfolio_to_art_photos
     * const { count } = await prisma.portfolio_to_art_photo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Portfolio_to_art_photoDeleteManyArgs>(args?: SelectSubset<T, Portfolio_to_art_photoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolio_to_art_photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Portfolio_to_art_photoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolio_to_art_photos
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Portfolio_to_art_photoUpdateManyArgs>(args: SelectSubset<T, Portfolio_to_art_photoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Portfolio_to_art_photo.
     * @param {Portfolio_to_art_photoUpsertArgs} args - Arguments to update or create a Portfolio_to_art_photo.
     * @example
     * // Update or create a Portfolio_to_art_photo
     * const portfolio_to_art_photo = await prisma.portfolio_to_art_photo.upsert({
     *   create: {
     *     // ... data to create a Portfolio_to_art_photo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio_to_art_photo we want to update
     *   }
     * })
     */
    upsert<T extends Portfolio_to_art_photoUpsertArgs>(args: SelectSubset<T, Portfolio_to_art_photoUpsertArgs<ExtArgs>>): Prisma__Portfolio_to_art_photoClient<$Result.GetResult<Prisma.$Portfolio_to_art_photoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Portfolio_to_art_photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Portfolio_to_art_photoCountArgs} args - Arguments to filter Portfolio_to_art_photos to count.
     * @example
     * // Count the number of Portfolio_to_art_photos
     * const count = await prisma.portfolio_to_art_photo.count({
     *   where: {
     *     // ... the filter for the Portfolio_to_art_photos we want to count
     *   }
     * })
    **/
    count<T extends Portfolio_to_art_photoCountArgs>(
      args?: Subset<T, Portfolio_to_art_photoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Portfolio_to_art_photoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio_to_art_photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Portfolio_to_art_photoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Portfolio_to_art_photoAggregateArgs>(args: Subset<T, Portfolio_to_art_photoAggregateArgs>): Prisma.PrismaPromise<GetPortfolio_to_art_photoAggregateType<T>>

    /**
     * Group by Portfolio_to_art_photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Portfolio_to_art_photoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Portfolio_to_art_photoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Portfolio_to_art_photoGroupByArgs['orderBy'] }
        : { orderBy?: Portfolio_to_art_photoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Portfolio_to_art_photoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolio_to_art_photoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio_to_art_photo model
   */
  readonly fields: Portfolio_to_art_photoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio_to_art_photo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Portfolio_to_art_photoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portfolio_to_art_photo model
   */ 
  interface Portfolio_to_art_photoFieldRefs {
    readonly id: FieldRef<"Portfolio_to_art_photo", 'Int'>
    readonly portfolio_id: FieldRef<"Portfolio_to_art_photo", 'String'>
    readonly photo_url: FieldRef<"Portfolio_to_art_photo", 'String'>
    readonly photo_desc: FieldRef<"Portfolio_to_art_photo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio_to_art_photo findUnique
   */
  export type Portfolio_to_art_photoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio_to_art_photo to fetch.
     */
    where: Portfolio_to_art_photoWhereUniqueInput
  }

  /**
   * Portfolio_to_art_photo findUniqueOrThrow
   */
  export type Portfolio_to_art_photoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio_to_art_photo to fetch.
     */
    where: Portfolio_to_art_photoWhereUniqueInput
  }

  /**
   * Portfolio_to_art_photo findFirst
   */
  export type Portfolio_to_art_photoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio_to_art_photo to fetch.
     */
    where?: Portfolio_to_art_photoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolio_to_art_photos to fetch.
     */
    orderBy?: Portfolio_to_art_photoOrderByWithRelationInput | Portfolio_to_art_photoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolio_to_art_photos.
     */
    cursor?: Portfolio_to_art_photoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolio_to_art_photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolio_to_art_photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolio_to_art_photos.
     */
    distinct?: Portfolio_to_art_photoScalarFieldEnum | Portfolio_to_art_photoScalarFieldEnum[]
  }

  /**
   * Portfolio_to_art_photo findFirstOrThrow
   */
  export type Portfolio_to_art_photoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio_to_art_photo to fetch.
     */
    where?: Portfolio_to_art_photoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolio_to_art_photos to fetch.
     */
    orderBy?: Portfolio_to_art_photoOrderByWithRelationInput | Portfolio_to_art_photoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolio_to_art_photos.
     */
    cursor?: Portfolio_to_art_photoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolio_to_art_photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolio_to_art_photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolio_to_art_photos.
     */
    distinct?: Portfolio_to_art_photoScalarFieldEnum | Portfolio_to_art_photoScalarFieldEnum[]
  }

  /**
   * Portfolio_to_art_photo findMany
   */
  export type Portfolio_to_art_photoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio_to_art_photos to fetch.
     */
    where?: Portfolio_to_art_photoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolio_to_art_photos to fetch.
     */
    orderBy?: Portfolio_to_art_photoOrderByWithRelationInput | Portfolio_to_art_photoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolio_to_art_photos.
     */
    cursor?: Portfolio_to_art_photoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolio_to_art_photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolio_to_art_photos.
     */
    skip?: number
    distinct?: Portfolio_to_art_photoScalarFieldEnum | Portfolio_to_art_photoScalarFieldEnum[]
  }

  /**
   * Portfolio_to_art_photo create
   */
  export type Portfolio_to_art_photoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio_to_art_photo.
     */
    data: XOR<Portfolio_to_art_photoCreateInput, Portfolio_to_art_photoUncheckedCreateInput>
  }

  /**
   * Portfolio_to_art_photo createMany
   */
  export type Portfolio_to_art_photoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolio_to_art_photos.
     */
    data: Portfolio_to_art_photoCreateManyInput | Portfolio_to_art_photoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Portfolio_to_art_photo createManyAndReturn
   */
  export type Portfolio_to_art_photoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Portfolio_to_art_photos.
     */
    data: Portfolio_to_art_photoCreateManyInput | Portfolio_to_art_photoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio_to_art_photo update
   */
  export type Portfolio_to_art_photoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio_to_art_photo.
     */
    data: XOR<Portfolio_to_art_photoUpdateInput, Portfolio_to_art_photoUncheckedUpdateInput>
    /**
     * Choose, which Portfolio_to_art_photo to update.
     */
    where: Portfolio_to_art_photoWhereUniqueInput
  }

  /**
   * Portfolio_to_art_photo updateMany
   */
  export type Portfolio_to_art_photoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolio_to_art_photos.
     */
    data: XOR<Portfolio_to_art_photoUpdateManyMutationInput, Portfolio_to_art_photoUncheckedUpdateManyInput>
    /**
     * Filter which Portfolio_to_art_photos to update
     */
    where?: Portfolio_to_art_photoWhereInput
  }

  /**
   * Portfolio_to_art_photo upsert
   */
  export type Portfolio_to_art_photoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio_to_art_photo to update in case it exists.
     */
    where: Portfolio_to_art_photoWhereUniqueInput
    /**
     * In case the Portfolio_to_art_photo found by the `where` argument doesn't exist, create a new Portfolio_to_art_photo with this data.
     */
    create: XOR<Portfolio_to_art_photoCreateInput, Portfolio_to_art_photoUncheckedCreateInput>
    /**
     * In case the Portfolio_to_art_photo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Portfolio_to_art_photoUpdateInput, Portfolio_to_art_photoUncheckedUpdateInput>
  }

  /**
   * Portfolio_to_art_photo delete
   */
  export type Portfolio_to_art_photoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
    /**
     * Filter which Portfolio_to_art_photo to delete.
     */
    where: Portfolio_to_art_photoWhereUniqueInput
  }

  /**
   * Portfolio_to_art_photo deleteMany
   */
  export type Portfolio_to_art_photoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio_to_art_photos to delete
     */
    where?: Portfolio_to_art_photoWhereInput
  }

  /**
   * Portfolio_to_art_photo without action
   */
  export type Portfolio_to_art_photoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio_to_art_photo
     */
    select?: Portfolio_to_art_photoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Portfolio_to_art_photoInclude<ExtArgs> | null
  }


  /**
   * Model Login_session
   */

  export type AggregateLogin_session = {
    _count: Login_sessionCountAggregateOutputType | null
    _avg: Login_sessionAvgAggregateOutputType | null
    _sum: Login_sessionSumAggregateOutputType | null
    _min: Login_sessionMinAggregateOutputType | null
    _max: Login_sessionMaxAggregateOutputType | null
  }

  export type Login_sessionAvgAggregateOutputType = {
    created_at: number | null
  }

  export type Login_sessionSumAggregateOutputType = {
    created_at: number | null
  }

  export type Login_sessionMinAggregateOutputType = {
    id: string | null
    uuid: string | null
    company_email: string | null
    refresh_token: string | null
    is_blocked: boolean | null
    expired_at: Date | null
    created_at: number | null
    created_at_hk: string | null
  }

  export type Login_sessionMaxAggregateOutputType = {
    id: string | null
    uuid: string | null
    company_email: string | null
    refresh_token: string | null
    is_blocked: boolean | null
    expired_at: Date | null
    created_at: number | null
    created_at_hk: string | null
  }

  export type Login_sessionCountAggregateOutputType = {
    id: number
    uuid: number
    company_email: number
    refresh_token: number
    is_blocked: number
    expired_at: number
    created_at: number
    created_at_hk: number
    _all: number
  }


  export type Login_sessionAvgAggregateInputType = {
    created_at?: true
  }

  export type Login_sessionSumAggregateInputType = {
    created_at?: true
  }

  export type Login_sessionMinAggregateInputType = {
    id?: true
    uuid?: true
    company_email?: true
    refresh_token?: true
    is_blocked?: true
    expired_at?: true
    created_at?: true
    created_at_hk?: true
  }

  export type Login_sessionMaxAggregateInputType = {
    id?: true
    uuid?: true
    company_email?: true
    refresh_token?: true
    is_blocked?: true
    expired_at?: true
    created_at?: true
    created_at_hk?: true
  }

  export type Login_sessionCountAggregateInputType = {
    id?: true
    uuid?: true
    company_email?: true
    refresh_token?: true
    is_blocked?: true
    expired_at?: true
    created_at?: true
    created_at_hk?: true
    _all?: true
  }

  export type Login_sessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Login_session to aggregate.
     */
    where?: Login_sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Login_sessions to fetch.
     */
    orderBy?: Login_sessionOrderByWithRelationInput | Login_sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Login_sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Login_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Login_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Login_sessions
    **/
    _count?: true | Login_sessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Login_sessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Login_sessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Login_sessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Login_sessionMaxAggregateInputType
  }

  export type GetLogin_sessionAggregateType<T extends Login_sessionAggregateArgs> = {
        [P in keyof T & keyof AggregateLogin_session]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogin_session[P]>
      : GetScalarType<T[P], AggregateLogin_session[P]>
  }




  export type Login_sessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Login_sessionWhereInput
    orderBy?: Login_sessionOrderByWithAggregationInput | Login_sessionOrderByWithAggregationInput[]
    by: Login_sessionScalarFieldEnum[] | Login_sessionScalarFieldEnum
    having?: Login_sessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Login_sessionCountAggregateInputType | true
    _avg?: Login_sessionAvgAggregateInputType
    _sum?: Login_sessionSumAggregateInputType
    _min?: Login_sessionMinAggregateInputType
    _max?: Login_sessionMaxAggregateInputType
  }

  export type Login_sessionGroupByOutputType = {
    id: string
    uuid: string
    company_email: string
    refresh_token: string
    is_blocked: boolean
    expired_at: Date
    created_at: number
    created_at_hk: string
    _count: Login_sessionCountAggregateOutputType | null
    _avg: Login_sessionAvgAggregateOutputType | null
    _sum: Login_sessionSumAggregateOutputType | null
    _min: Login_sessionMinAggregateOutputType | null
    _max: Login_sessionMaxAggregateOutputType | null
  }

  type GetLogin_sessionGroupByPayload<T extends Login_sessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Login_sessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Login_sessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Login_sessionGroupByOutputType[P]>
            : GetScalarType<T[P], Login_sessionGroupByOutputType[P]>
        }
      >
    >


  export type Login_sessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    company_email?: boolean
    refresh_token?: boolean
    is_blocked?: boolean
    expired_at?: boolean
    created_at?: boolean
    created_at_hk?: boolean
  }, ExtArgs["result"]["login_session"]>

  export type Login_sessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    company_email?: boolean
    refresh_token?: boolean
    is_blocked?: boolean
    expired_at?: boolean
    created_at?: boolean
    created_at_hk?: boolean
  }, ExtArgs["result"]["login_session"]>

  export type Login_sessionSelectScalar = {
    id?: boolean
    uuid?: boolean
    company_email?: boolean
    refresh_token?: boolean
    is_blocked?: boolean
    expired_at?: boolean
    created_at?: boolean
    created_at_hk?: boolean
  }


  export type $Login_sessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Login_session"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      uuid: string
      company_email: string
      refresh_token: string
      is_blocked: boolean
      expired_at: Date
      created_at: number
      created_at_hk: string
    }, ExtArgs["result"]["login_session"]>
    composites: {}
  }

  type Login_sessionGetPayload<S extends boolean | null | undefined | Login_sessionDefaultArgs> = $Result.GetResult<Prisma.$Login_sessionPayload, S>

  type Login_sessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<Login_sessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Login_sessionCountAggregateInputType | true
    }

  export interface Login_sessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Login_session'], meta: { name: 'Login_session' } }
    /**
     * Find zero or one Login_session that matches the filter.
     * @param {Login_sessionFindUniqueArgs} args - Arguments to find a Login_session
     * @example
     * // Get one Login_session
     * const login_session = await prisma.login_session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Login_sessionFindUniqueArgs>(args: SelectSubset<T, Login_sessionFindUniqueArgs<ExtArgs>>): Prisma__Login_sessionClient<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Login_session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {Login_sessionFindUniqueOrThrowArgs} args - Arguments to find a Login_session
     * @example
     * // Get one Login_session
     * const login_session = await prisma.login_session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Login_sessionFindUniqueOrThrowArgs>(args: SelectSubset<T, Login_sessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Login_sessionClient<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Login_session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Login_sessionFindFirstArgs} args - Arguments to find a Login_session
     * @example
     * // Get one Login_session
     * const login_session = await prisma.login_session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Login_sessionFindFirstArgs>(args?: SelectSubset<T, Login_sessionFindFirstArgs<ExtArgs>>): Prisma__Login_sessionClient<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Login_session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Login_sessionFindFirstOrThrowArgs} args - Arguments to find a Login_session
     * @example
     * // Get one Login_session
     * const login_session = await prisma.login_session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Login_sessionFindFirstOrThrowArgs>(args?: SelectSubset<T, Login_sessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__Login_sessionClient<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Login_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Login_sessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Login_sessions
     * const login_sessions = await prisma.login_session.findMany()
     * 
     * // Get first 10 Login_sessions
     * const login_sessions = await prisma.login_session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const login_sessionWithIdOnly = await prisma.login_session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Login_sessionFindManyArgs>(args?: SelectSubset<T, Login_sessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Login_session.
     * @param {Login_sessionCreateArgs} args - Arguments to create a Login_session.
     * @example
     * // Create one Login_session
     * const Login_session = await prisma.login_session.create({
     *   data: {
     *     // ... data to create a Login_session
     *   }
     * })
     * 
     */
    create<T extends Login_sessionCreateArgs>(args: SelectSubset<T, Login_sessionCreateArgs<ExtArgs>>): Prisma__Login_sessionClient<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Login_sessions.
     * @param {Login_sessionCreateManyArgs} args - Arguments to create many Login_sessions.
     * @example
     * // Create many Login_sessions
     * const login_session = await prisma.login_session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Login_sessionCreateManyArgs>(args?: SelectSubset<T, Login_sessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Login_sessions and returns the data saved in the database.
     * @param {Login_sessionCreateManyAndReturnArgs} args - Arguments to create many Login_sessions.
     * @example
     * // Create many Login_sessions
     * const login_session = await prisma.login_session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Login_sessions and only return the `id`
     * const login_sessionWithIdOnly = await prisma.login_session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Login_sessionCreateManyAndReturnArgs>(args?: SelectSubset<T, Login_sessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Login_session.
     * @param {Login_sessionDeleteArgs} args - Arguments to delete one Login_session.
     * @example
     * // Delete one Login_session
     * const Login_session = await prisma.login_session.delete({
     *   where: {
     *     // ... filter to delete one Login_session
     *   }
     * })
     * 
     */
    delete<T extends Login_sessionDeleteArgs>(args: SelectSubset<T, Login_sessionDeleteArgs<ExtArgs>>): Prisma__Login_sessionClient<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Login_session.
     * @param {Login_sessionUpdateArgs} args - Arguments to update one Login_session.
     * @example
     * // Update one Login_session
     * const login_session = await prisma.login_session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Login_sessionUpdateArgs>(args: SelectSubset<T, Login_sessionUpdateArgs<ExtArgs>>): Prisma__Login_sessionClient<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Login_sessions.
     * @param {Login_sessionDeleteManyArgs} args - Arguments to filter Login_sessions to delete.
     * @example
     * // Delete a few Login_sessions
     * const { count } = await prisma.login_session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Login_sessionDeleteManyArgs>(args?: SelectSubset<T, Login_sessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Login_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Login_sessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Login_sessions
     * const login_session = await prisma.login_session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Login_sessionUpdateManyArgs>(args: SelectSubset<T, Login_sessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Login_session.
     * @param {Login_sessionUpsertArgs} args - Arguments to update or create a Login_session.
     * @example
     * // Update or create a Login_session
     * const login_session = await prisma.login_session.upsert({
     *   create: {
     *     // ... data to create a Login_session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Login_session we want to update
     *   }
     * })
     */
    upsert<T extends Login_sessionUpsertArgs>(args: SelectSubset<T, Login_sessionUpsertArgs<ExtArgs>>): Prisma__Login_sessionClient<$Result.GetResult<Prisma.$Login_sessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Login_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Login_sessionCountArgs} args - Arguments to filter Login_sessions to count.
     * @example
     * // Count the number of Login_sessions
     * const count = await prisma.login_session.count({
     *   where: {
     *     // ... the filter for the Login_sessions we want to count
     *   }
     * })
    **/
    count<T extends Login_sessionCountArgs>(
      args?: Subset<T, Login_sessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Login_sessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Login_session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Login_sessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Login_sessionAggregateArgs>(args: Subset<T, Login_sessionAggregateArgs>): Prisma.PrismaPromise<GetLogin_sessionAggregateType<T>>

    /**
     * Group by Login_session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Login_sessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Login_sessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Login_sessionGroupByArgs['orderBy'] }
        : { orderBy?: Login_sessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Login_sessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogin_sessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Login_session model
   */
  readonly fields: Login_sessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Login_session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Login_sessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Login_session model
   */ 
  interface Login_sessionFieldRefs {
    readonly id: FieldRef<"Login_session", 'String'>
    readonly uuid: FieldRef<"Login_session", 'String'>
    readonly company_email: FieldRef<"Login_session", 'String'>
    readonly refresh_token: FieldRef<"Login_session", 'String'>
    readonly is_blocked: FieldRef<"Login_session", 'Boolean'>
    readonly expired_at: FieldRef<"Login_session", 'DateTime'>
    readonly created_at: FieldRef<"Login_session", 'Float'>
    readonly created_at_hk: FieldRef<"Login_session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Login_session findUnique
   */
  export type Login_sessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * Filter, which Login_session to fetch.
     */
    where: Login_sessionWhereUniqueInput
  }

  /**
   * Login_session findUniqueOrThrow
   */
  export type Login_sessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * Filter, which Login_session to fetch.
     */
    where: Login_sessionWhereUniqueInput
  }

  /**
   * Login_session findFirst
   */
  export type Login_sessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * Filter, which Login_session to fetch.
     */
    where?: Login_sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Login_sessions to fetch.
     */
    orderBy?: Login_sessionOrderByWithRelationInput | Login_sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Login_sessions.
     */
    cursor?: Login_sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Login_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Login_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Login_sessions.
     */
    distinct?: Login_sessionScalarFieldEnum | Login_sessionScalarFieldEnum[]
  }

  /**
   * Login_session findFirstOrThrow
   */
  export type Login_sessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * Filter, which Login_session to fetch.
     */
    where?: Login_sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Login_sessions to fetch.
     */
    orderBy?: Login_sessionOrderByWithRelationInput | Login_sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Login_sessions.
     */
    cursor?: Login_sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Login_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Login_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Login_sessions.
     */
    distinct?: Login_sessionScalarFieldEnum | Login_sessionScalarFieldEnum[]
  }

  /**
   * Login_session findMany
   */
  export type Login_sessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * Filter, which Login_sessions to fetch.
     */
    where?: Login_sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Login_sessions to fetch.
     */
    orderBy?: Login_sessionOrderByWithRelationInput | Login_sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Login_sessions.
     */
    cursor?: Login_sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Login_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Login_sessions.
     */
    skip?: number
    distinct?: Login_sessionScalarFieldEnum | Login_sessionScalarFieldEnum[]
  }

  /**
   * Login_session create
   */
  export type Login_sessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * The data needed to create a Login_session.
     */
    data: XOR<Login_sessionCreateInput, Login_sessionUncheckedCreateInput>
  }

  /**
   * Login_session createMany
   */
  export type Login_sessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Login_sessions.
     */
    data: Login_sessionCreateManyInput | Login_sessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Login_session createManyAndReturn
   */
  export type Login_sessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Login_sessions.
     */
    data: Login_sessionCreateManyInput | Login_sessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Login_session update
   */
  export type Login_sessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * The data needed to update a Login_session.
     */
    data: XOR<Login_sessionUpdateInput, Login_sessionUncheckedUpdateInput>
    /**
     * Choose, which Login_session to update.
     */
    where: Login_sessionWhereUniqueInput
  }

  /**
   * Login_session updateMany
   */
  export type Login_sessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Login_sessions.
     */
    data: XOR<Login_sessionUpdateManyMutationInput, Login_sessionUncheckedUpdateManyInput>
    /**
     * Filter which Login_sessions to update
     */
    where?: Login_sessionWhereInput
  }

  /**
   * Login_session upsert
   */
  export type Login_sessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * The filter to search for the Login_session to update in case it exists.
     */
    where: Login_sessionWhereUniqueInput
    /**
     * In case the Login_session found by the `where` argument doesn't exist, create a new Login_session with this data.
     */
    create: XOR<Login_sessionCreateInput, Login_sessionUncheckedCreateInput>
    /**
     * In case the Login_session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Login_sessionUpdateInput, Login_sessionUncheckedUpdateInput>
  }

  /**
   * Login_session delete
   */
  export type Login_sessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
    /**
     * Filter which Login_session to delete.
     */
    where: Login_sessionWhereUniqueInput
  }

  /**
   * Login_session deleteMany
   */
  export type Login_sessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Login_sessions to delete
     */
    where?: Login_sessionWhereInput
  }

  /**
   * Login_session without action
   */
  export type Login_sessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Login_session
     */
    select?: Login_sessionSelect<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    created_at: number | null
  }

  export type UserSumAggregateOutputType = {
    created_at: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    is_blocked: boolean | null
    company_email: string | null
    password_hash: string | null
    avatar_file_url: string | null
    created_at: number | null
    mobile_number: string | null
    role_in_system: $Enums.Role | null
    role_in_company: string | null
    created_at_hk: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    is_blocked: boolean | null
    company_email: string | null
    password_hash: string | null
    avatar_file_url: string | null
    created_at: number | null
    mobile_number: string | null
    role_in_system: $Enums.Role | null
    role_in_company: string | null
    created_at_hk: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    is_blocked: number
    company_email: number
    password_hash: number
    avatar_file_url: number
    created_at: number
    mobile_number: number
    role_in_system: number
    role_in_company: number
    created_at_hk: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    created_at?: true
  }

  export type UserSumAggregateInputType = {
    created_at?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    is_blocked?: true
    company_email?: true
    password_hash?: true
    avatar_file_url?: true
    created_at?: true
    mobile_number?: true
    role_in_system?: true
    role_in_company?: true
    created_at_hk?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    is_blocked?: true
    company_email?: true
    password_hash?: true
    avatar_file_url?: true
    created_at?: true
    mobile_number?: true
    role_in_system?: true
    role_in_company?: true
    created_at_hk?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    is_blocked?: true
    company_email?: true
    password_hash?: true
    avatar_file_url?: true
    created_at?: true
    mobile_number?: true
    role_in_system?: true
    role_in_company?: true
    created_at_hk?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    first_name: string
    last_name: string
    is_blocked: boolean
    company_email: string
    password_hash: string
    avatar_file_url: string
    created_at: number
    mobile_number: string
    role_in_system: $Enums.Role
    role_in_company: string
    created_at_hk: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    is_blocked?: boolean
    company_email?: boolean
    password_hash?: boolean
    avatar_file_url?: boolean
    created_at?: boolean
    mobile_number?: boolean
    role_in_system?: boolean
    role_in_company?: boolean
    created_at_hk?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    is_blocked?: boolean
    company_email?: boolean
    password_hash?: boolean
    avatar_file_url?: boolean
    created_at?: boolean
    mobile_number?: boolean
    role_in_system?: boolean
    role_in_company?: boolean
    created_at_hk?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    is_blocked?: boolean
    company_email?: boolean
    password_hash?: boolean
    avatar_file_url?: boolean
    created_at?: boolean
    mobile_number?: boolean
    role_in_system?: boolean
    role_in_company?: boolean
    created_at_hk?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      first_name: string
      last_name: string
      is_blocked: boolean
      company_email: string
      password_hash: string
      avatar_file_url: string
      created_at: number
      mobile_number: string
      role_in_system: $Enums.Role
      role_in_company: string
      created_at_hk: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly is_blocked: FieldRef<"User", 'Boolean'>
    readonly company_email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly avatar_file_url: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'Float'>
    readonly mobile_number: FieldRef<"User", 'String'>
    readonly role_in_system: FieldRef<"User", 'Role'>
    readonly role_in_company: FieldRef<"User", 'String'>
    readonly created_at_hk: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    id: number | null
    created_at: number | null
  }

  export type CourseSumAggregateOutputType = {
    id: number | null
    created_at: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: number | null
    created_at: number | null
    created_at_hk: string | null
    course_name: string | null
  }

  export type CourseMaxAggregateOutputType = {
    id: number | null
    created_at: number | null
    created_at_hk: string | null
    course_name: string | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    created_at: number
    created_at_hk: number
    course_name: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    id?: true
    created_at?: true
  }

  export type CourseSumAggregateInputType = {
    id?: true
    created_at?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    created_at?: true
    created_at_hk?: true
    course_name?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    created_at?: true
    created_at_hk?: true
    course_name?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    created_at?: true
    created_at_hk?: true
    course_name?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: number
    created_at: number
    created_at_hk: string
    course_name: string
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    course_name?: boolean
    Student_package?: boolean | Course$Student_packageArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    course_name?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    course_name?: boolean
  }

  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Student_package?: boolean | Course$Student_packageArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      Student_package: Prisma.$Student_packagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: number
      created_at_hk: string
      course_name: string
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Student_package<T extends Course$Student_packageArgs<ExtArgs> = {}>(args?: Subset<T, Course$Student_packageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */ 
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'Int'>
    readonly created_at: FieldRef<"Course", 'Float'>
    readonly created_at_hk: FieldRef<"Course", 'String'>
    readonly course_name: FieldRef<"Course", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
  }

  /**
   * Course.Student_package
   */
  export type Course$Student_packageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    where?: Student_packageWhereInput
    orderBy?: Student_packageOrderByWithRelationInput | Student_packageOrderByWithRelationInput[]
    cursor?: Student_packageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Student_packageScalarFieldEnum | Student_packageScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassAvgAggregateOutputType = {
    id: number | null
    day_unix_timestamp: number | null
    hour_unix_timestamp: number | null
    min: number | null
    created_at: number | null
    class_group_id: number | null
    student_package_id: number | null
  }

  export type ClassSumAggregateOutputType = {
    id: number | null
    day_unix_timestamp: number | null
    hour_unix_timestamp: number | null
    min: number | null
    created_at: number | null
    class_group_id: number | null
    student_package_id: number | null
  }

  export type ClassMinAggregateOutputType = {
    id: number | null
    day_unix_timestamp: number | null
    hour_unix_timestamp: number | null
    min: number | null
    created_at: number | null
    created_at_hk: string | null
    class_group_id: number | null
    actual_classroom: string | null
    reason_for_absence: string | null
    class_status: $Enums.Class_status | null
    student_package_id: number | null
    remark: string | null
  }

  export type ClassMaxAggregateOutputType = {
    id: number | null
    day_unix_timestamp: number | null
    hour_unix_timestamp: number | null
    min: number | null
    created_at: number | null
    created_at_hk: string | null
    class_group_id: number | null
    actual_classroom: string | null
    reason_for_absence: string | null
    class_status: $Enums.Class_status | null
    student_package_id: number | null
    remark: string | null
  }

  export type ClassCountAggregateOutputType = {
    id: number
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at: number
    created_at_hk: number
    class_group_id: number
    actual_classroom: number
    reason_for_absence: number
    class_status: number
    student_package_id: number
    remark: number
    _all: number
  }


  export type ClassAvgAggregateInputType = {
    id?: true
    day_unix_timestamp?: true
    hour_unix_timestamp?: true
    min?: true
    created_at?: true
    class_group_id?: true
    student_package_id?: true
  }

  export type ClassSumAggregateInputType = {
    id?: true
    day_unix_timestamp?: true
    hour_unix_timestamp?: true
    min?: true
    created_at?: true
    class_group_id?: true
    student_package_id?: true
  }

  export type ClassMinAggregateInputType = {
    id?: true
    day_unix_timestamp?: true
    hour_unix_timestamp?: true
    min?: true
    created_at?: true
    created_at_hk?: true
    class_group_id?: true
    actual_classroom?: true
    reason_for_absence?: true
    class_status?: true
    student_package_id?: true
    remark?: true
  }

  export type ClassMaxAggregateInputType = {
    id?: true
    day_unix_timestamp?: true
    hour_unix_timestamp?: true
    min?: true
    created_at?: true
    created_at_hk?: true
    class_group_id?: true
    actual_classroom?: true
    reason_for_absence?: true
    class_status?: true
    student_package_id?: true
    remark?: true
  }

  export type ClassCountAggregateInputType = {
    id?: true
    day_unix_timestamp?: true
    hour_unix_timestamp?: true
    min?: true
    created_at?: true
    created_at_hk?: true
    class_group_id?: true
    actual_classroom?: true
    reason_for_absence?: true
    class_status?: true
    student_package_id?: true
    remark?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _avg?: ClassAvgAggregateInputType
    _sum?: ClassSumAggregateInputType
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    id: number
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at: number
    created_at_hk: string
    class_group_id: number | null
    actual_classroom: string | null
    reason_for_absence: string | null
    class_status: $Enums.Class_status
    student_package_id: number
    remark: string | null
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    day_unix_timestamp?: boolean
    hour_unix_timestamp?: boolean
    min?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    class_group_id?: boolean
    actual_classroom?: boolean
    reason_for_absence?: boolean
    class_status?: boolean
    student_package_id?: boolean
    remark?: boolean
    Class_group_of_Classes?: boolean | Class$Class_group_of_ClassesArgs<ExtArgs>
    Student_package?: boolean | Student_packageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    day_unix_timestamp?: boolean
    hour_unix_timestamp?: boolean
    min?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    class_group_id?: boolean
    actual_classroom?: boolean
    reason_for_absence?: boolean
    class_status?: boolean
    student_package_id?: boolean
    remark?: boolean
    Class_group_of_Classes?: boolean | Class$Class_group_of_ClassesArgs<ExtArgs>
    Student_package?: boolean | Student_packageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectScalar = {
    id?: boolean
    day_unix_timestamp?: boolean
    hour_unix_timestamp?: boolean
    min?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    class_group_id?: boolean
    actual_classroom?: boolean
    reason_for_absence?: boolean
    class_status?: boolean
    student_package_id?: boolean
    remark?: boolean
  }

  export type ClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Class_group_of_Classes?: boolean | Class$Class_group_of_ClassesArgs<ExtArgs>
    Student_package?: boolean | Student_packageDefaultArgs<ExtArgs>
  }
  export type ClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Class_group_of_Classes?: boolean | Class$Class_group_of_ClassesArgs<ExtArgs>
    Student_package?: boolean | Student_packageDefaultArgs<ExtArgs>
  }

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {
      Class_group_of_Classes: Prisma.$Class_groupPayload<ExtArgs> | null
      Student_package: Prisma.$Student_packagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      day_unix_timestamp: number
      hour_unix_timestamp: number
      min: number
      created_at: number
      created_at_hk: string
      class_group_id: number | null
      actual_classroom: string | null
      reason_for_absence: string | null
      class_status: $Enums.Class_status
      student_package_id: number
      remark: string | null
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Class_group_of_Classes<T extends Class$Class_group_of_ClassesArgs<ExtArgs> = {}>(args?: Subset<T, Class$Class_group_of_ClassesArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    Student_package<T extends Student_packageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, Student_packageDefaultArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class model
   */ 
  interface ClassFieldRefs {
    readonly id: FieldRef<"Class", 'Int'>
    readonly day_unix_timestamp: FieldRef<"Class", 'Float'>
    readonly hour_unix_timestamp: FieldRef<"Class", 'Float'>
    readonly min: FieldRef<"Class", 'Int'>
    readonly created_at: FieldRef<"Class", 'Float'>
    readonly created_at_hk: FieldRef<"Class", 'String'>
    readonly class_group_id: FieldRef<"Class", 'Int'>
    readonly actual_classroom: FieldRef<"Class", 'String'>
    readonly reason_for_absence: FieldRef<"Class", 'String'>
    readonly class_status: FieldRef<"Class", 'Class_status'>
    readonly student_package_id: FieldRef<"Class", 'Int'>
    readonly remark: FieldRef<"Class", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
  }

  /**
   * Class.Class_group_of_Classes
   */
  export type Class$Class_group_of_ClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    where?: Class_groupWhereInput
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
  }


  /**
   * Model Student_package
   */

  export type AggregateStudent_package = {
    _count: Student_packageCountAggregateOutputType | null
    _avg: Student_packageAvgAggregateOutputType | null
    _sum: Student_packageSumAggregateOutputType | null
    _min: Student_packageMinAggregateOutputType | null
    _max: Student_packageMaxAggregateOutputType | null
  }

  export type Student_packageAvgAggregateOutputType = {
    id: number | null
    start_date: number | null
    paid_at: number | null
    official_end_date: number | null
    expiry_date: number | null
    min: number | null
    course_id: number | null
    created_at: number | null
    num_of_classes: number | null
  }

  export type Student_packageSumAggregateOutputType = {
    id: number | null
    start_date: number | null
    paid_at: number | null
    official_end_date: number | null
    expiry_date: number | null
    min: number | null
    course_id: number | null
    created_at: number | null
    num_of_classes: number | null
  }

  export type Student_packageMinAggregateOutputType = {
    id: number | null
    start_date: number | null
    paid_at: number | null
    official_end_date: number | null
    expiry_date: number | null
    min: number | null
    course_id: number | null
    student_id: string | null
    created_at: number | null
    created_at_hk: string | null
    num_of_classes: number | null
    default_classroom: $Enums.Classroom | null
  }

  export type Student_packageMaxAggregateOutputType = {
    id: number | null
    start_date: number | null
    paid_at: number | null
    official_end_date: number | null
    expiry_date: number | null
    min: number | null
    course_id: number | null
    student_id: string | null
    created_at: number | null
    created_at_hk: string | null
    num_of_classes: number | null
    default_classroom: $Enums.Classroom | null
  }

  export type Student_packageCountAggregateOutputType = {
    id: number
    start_date: number
    paid_at: number
    official_end_date: number
    expiry_date: number
    min: number
    course_id: number
    student_id: number
    created_at: number
    created_at_hk: number
    num_of_classes: number
    default_classroom: number
    _all: number
  }


  export type Student_packageAvgAggregateInputType = {
    id?: true
    start_date?: true
    paid_at?: true
    official_end_date?: true
    expiry_date?: true
    min?: true
    course_id?: true
    created_at?: true
    num_of_classes?: true
  }

  export type Student_packageSumAggregateInputType = {
    id?: true
    start_date?: true
    paid_at?: true
    official_end_date?: true
    expiry_date?: true
    min?: true
    course_id?: true
    created_at?: true
    num_of_classes?: true
  }

  export type Student_packageMinAggregateInputType = {
    id?: true
    start_date?: true
    paid_at?: true
    official_end_date?: true
    expiry_date?: true
    min?: true
    course_id?: true
    student_id?: true
    created_at?: true
    created_at_hk?: true
    num_of_classes?: true
    default_classroom?: true
  }

  export type Student_packageMaxAggregateInputType = {
    id?: true
    start_date?: true
    paid_at?: true
    official_end_date?: true
    expiry_date?: true
    min?: true
    course_id?: true
    student_id?: true
    created_at?: true
    created_at_hk?: true
    num_of_classes?: true
    default_classroom?: true
  }

  export type Student_packageCountAggregateInputType = {
    id?: true
    start_date?: true
    paid_at?: true
    official_end_date?: true
    expiry_date?: true
    min?: true
    course_id?: true
    student_id?: true
    created_at?: true
    created_at_hk?: true
    num_of_classes?: true
    default_classroom?: true
    _all?: true
  }

  export type Student_packageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student_package to aggregate.
     */
    where?: Student_packageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Student_packages to fetch.
     */
    orderBy?: Student_packageOrderByWithRelationInput | Student_packageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Student_packageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Student_packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Student_packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Student_packages
    **/
    _count?: true | Student_packageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Student_packageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Student_packageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Student_packageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Student_packageMaxAggregateInputType
  }

  export type GetStudent_packageAggregateType<T extends Student_packageAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent_package]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent_package[P]>
      : GetScalarType<T[P], AggregateStudent_package[P]>
  }




  export type Student_packageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Student_packageWhereInput
    orderBy?: Student_packageOrderByWithAggregationInput | Student_packageOrderByWithAggregationInput[]
    by: Student_packageScalarFieldEnum[] | Student_packageScalarFieldEnum
    having?: Student_packageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Student_packageCountAggregateInputType | true
    _avg?: Student_packageAvgAggregateInputType
    _sum?: Student_packageSumAggregateInputType
    _min?: Student_packageMinAggregateInputType
    _max?: Student_packageMaxAggregateInputType
  }

  export type Student_packageGroupByOutputType = {
    id: number
    start_date: number
    paid_at: number | null
    official_end_date: number | null
    expiry_date: number
    min: number
    course_id: number
    student_id: string
    created_at: number
    created_at_hk: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
    _count: Student_packageCountAggregateOutputType | null
    _avg: Student_packageAvgAggregateOutputType | null
    _sum: Student_packageSumAggregateOutputType | null
    _min: Student_packageMinAggregateOutputType | null
    _max: Student_packageMaxAggregateOutputType | null
  }

  type GetStudent_packageGroupByPayload<T extends Student_packageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Student_packageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Student_packageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Student_packageGroupByOutputType[P]>
            : GetScalarType<T[P], Student_packageGroupByOutputType[P]>
        }
      >
    >


  export type Student_packageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    start_date?: boolean
    paid_at?: boolean
    official_end_date?: boolean
    expiry_date?: boolean
    min?: boolean
    course_id?: boolean
    student_id?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    num_of_classes?: boolean
    default_classroom?: boolean
    Class?: boolean | Student_package$ClassArgs<ExtArgs>
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    Student?: boolean | StudentDefaultArgs<ExtArgs>
    _count?: boolean | Student_packageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_package"]>

  export type Student_packageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    start_date?: boolean
    paid_at?: boolean
    official_end_date?: boolean
    expiry_date?: boolean
    min?: boolean
    course_id?: boolean
    student_id?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    num_of_classes?: boolean
    default_classroom?: boolean
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    Student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_package"]>

  export type Student_packageSelectScalar = {
    id?: boolean
    start_date?: boolean
    paid_at?: boolean
    official_end_date?: boolean
    expiry_date?: boolean
    min?: boolean
    course_id?: boolean
    student_id?: boolean
    created_at?: boolean
    created_at_hk?: boolean
    num_of_classes?: boolean
    default_classroom?: boolean
  }

  export type Student_packageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Class?: boolean | Student_package$ClassArgs<ExtArgs>
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    Student?: boolean | StudentDefaultArgs<ExtArgs>
    _count?: boolean | Student_packageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type Student_packageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    Student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $Student_packagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student_package"
    objects: {
      Class: Prisma.$ClassPayload<ExtArgs>[]
      Course: Prisma.$CoursePayload<ExtArgs>
      Student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      start_date: number
      paid_at: number | null
      official_end_date: number | null
      expiry_date: number
      min: number
      course_id: number
      student_id: string
      created_at: number
      created_at_hk: string
      num_of_classes: number
      default_classroom: $Enums.Classroom
    }, ExtArgs["result"]["student_package"]>
    composites: {}
  }

  type Student_packageGetPayload<S extends boolean | null | undefined | Student_packageDefaultArgs> = $Result.GetResult<Prisma.$Student_packagePayload, S>

  type Student_packageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<Student_packageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Student_packageCountAggregateInputType | true
    }

  export interface Student_packageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student_package'], meta: { name: 'Student_package' } }
    /**
     * Find zero or one Student_package that matches the filter.
     * @param {Student_packageFindUniqueArgs} args - Arguments to find a Student_package
     * @example
     * // Get one Student_package
     * const student_package = await prisma.student_package.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Student_packageFindUniqueArgs>(args: SelectSubset<T, Student_packageFindUniqueArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student_package that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {Student_packageFindUniqueOrThrowArgs} args - Arguments to find a Student_package
     * @example
     * // Get one Student_package
     * const student_package = await prisma.student_package.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Student_packageFindUniqueOrThrowArgs>(args: SelectSubset<T, Student_packageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student_package that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_packageFindFirstArgs} args - Arguments to find a Student_package
     * @example
     * // Get one Student_package
     * const student_package = await prisma.student_package.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Student_packageFindFirstArgs>(args?: SelectSubset<T, Student_packageFindFirstArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student_package that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_packageFindFirstOrThrowArgs} args - Arguments to find a Student_package
     * @example
     * // Get one Student_package
     * const student_package = await prisma.student_package.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Student_packageFindFirstOrThrowArgs>(args?: SelectSubset<T, Student_packageFindFirstOrThrowArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Student_packages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_packageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Student_packages
     * const student_packages = await prisma.student_package.findMany()
     * 
     * // Get first 10 Student_packages
     * const student_packages = await prisma.student_package.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const student_packageWithIdOnly = await prisma.student_package.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Student_packageFindManyArgs>(args?: SelectSubset<T, Student_packageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student_package.
     * @param {Student_packageCreateArgs} args - Arguments to create a Student_package.
     * @example
     * // Create one Student_package
     * const Student_package = await prisma.student_package.create({
     *   data: {
     *     // ... data to create a Student_package
     *   }
     * })
     * 
     */
    create<T extends Student_packageCreateArgs>(args: SelectSubset<T, Student_packageCreateArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Student_packages.
     * @param {Student_packageCreateManyArgs} args - Arguments to create many Student_packages.
     * @example
     * // Create many Student_packages
     * const student_package = await prisma.student_package.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Student_packageCreateManyArgs>(args?: SelectSubset<T, Student_packageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Student_packages and returns the data saved in the database.
     * @param {Student_packageCreateManyAndReturnArgs} args - Arguments to create many Student_packages.
     * @example
     * // Create many Student_packages
     * const student_package = await prisma.student_package.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Student_packages and only return the `id`
     * const student_packageWithIdOnly = await prisma.student_package.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Student_packageCreateManyAndReturnArgs>(args?: SelectSubset<T, Student_packageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student_package.
     * @param {Student_packageDeleteArgs} args - Arguments to delete one Student_package.
     * @example
     * // Delete one Student_package
     * const Student_package = await prisma.student_package.delete({
     *   where: {
     *     // ... filter to delete one Student_package
     *   }
     * })
     * 
     */
    delete<T extends Student_packageDeleteArgs>(args: SelectSubset<T, Student_packageDeleteArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student_package.
     * @param {Student_packageUpdateArgs} args - Arguments to update one Student_package.
     * @example
     * // Update one Student_package
     * const student_package = await prisma.student_package.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Student_packageUpdateArgs>(args: SelectSubset<T, Student_packageUpdateArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Student_packages.
     * @param {Student_packageDeleteManyArgs} args - Arguments to filter Student_packages to delete.
     * @example
     * // Delete a few Student_packages
     * const { count } = await prisma.student_package.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Student_packageDeleteManyArgs>(args?: SelectSubset<T, Student_packageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_packageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Student_packages
     * const student_package = await prisma.student_package.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Student_packageUpdateManyArgs>(args: SelectSubset<T, Student_packageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student_package.
     * @param {Student_packageUpsertArgs} args - Arguments to update or create a Student_package.
     * @example
     * // Update or create a Student_package
     * const student_package = await prisma.student_package.upsert({
     *   create: {
     *     // ... data to create a Student_package
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student_package we want to update
     *   }
     * })
     */
    upsert<T extends Student_packageUpsertArgs>(args: SelectSubset<T, Student_packageUpsertArgs<ExtArgs>>): Prisma__Student_packageClient<$Result.GetResult<Prisma.$Student_packagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Student_packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_packageCountArgs} args - Arguments to filter Student_packages to count.
     * @example
     * // Count the number of Student_packages
     * const count = await prisma.student_package.count({
     *   where: {
     *     // ... the filter for the Student_packages we want to count
     *   }
     * })
    **/
    count<T extends Student_packageCountArgs>(
      args?: Subset<T, Student_packageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Student_packageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student_package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_packageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Student_packageAggregateArgs>(args: Subset<T, Student_packageAggregateArgs>): Prisma.PrismaPromise<GetStudent_packageAggregateType<T>>

    /**
     * Group by Student_package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_packageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Student_packageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Student_packageGroupByArgs['orderBy'] }
        : { orderBy?: Student_packageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Student_packageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudent_packageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student_package model
   */
  readonly fields: Student_packageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student_package.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Student_packageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Class<T extends Student_package$ClassArgs<ExtArgs> = {}>(args?: Subset<T, Student_package$ClassArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany"> | Null>
    Course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    Student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student_package model
   */ 
  interface Student_packageFieldRefs {
    readonly id: FieldRef<"Student_package", 'Int'>
    readonly start_date: FieldRef<"Student_package", 'Float'>
    readonly paid_at: FieldRef<"Student_package", 'Float'>
    readonly official_end_date: FieldRef<"Student_package", 'Float'>
    readonly expiry_date: FieldRef<"Student_package", 'Float'>
    readonly min: FieldRef<"Student_package", 'Int'>
    readonly course_id: FieldRef<"Student_package", 'Int'>
    readonly student_id: FieldRef<"Student_package", 'String'>
    readonly created_at: FieldRef<"Student_package", 'Float'>
    readonly created_at_hk: FieldRef<"Student_package", 'String'>
    readonly num_of_classes: FieldRef<"Student_package", 'Int'>
    readonly default_classroom: FieldRef<"Student_package", 'Classroom'>
  }
    

  // Custom InputTypes
  /**
   * Student_package findUnique
   */
  export type Student_packageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * Filter, which Student_package to fetch.
     */
    where: Student_packageWhereUniqueInput
  }

  /**
   * Student_package findUniqueOrThrow
   */
  export type Student_packageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * Filter, which Student_package to fetch.
     */
    where: Student_packageWhereUniqueInput
  }

  /**
   * Student_package findFirst
   */
  export type Student_packageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * Filter, which Student_package to fetch.
     */
    where?: Student_packageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Student_packages to fetch.
     */
    orderBy?: Student_packageOrderByWithRelationInput | Student_packageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Student_packages.
     */
    cursor?: Student_packageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Student_packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Student_packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Student_packages.
     */
    distinct?: Student_packageScalarFieldEnum | Student_packageScalarFieldEnum[]
  }

  /**
   * Student_package findFirstOrThrow
   */
  export type Student_packageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * Filter, which Student_package to fetch.
     */
    where?: Student_packageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Student_packages to fetch.
     */
    orderBy?: Student_packageOrderByWithRelationInput | Student_packageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Student_packages.
     */
    cursor?: Student_packageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Student_packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Student_packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Student_packages.
     */
    distinct?: Student_packageScalarFieldEnum | Student_packageScalarFieldEnum[]
  }

  /**
   * Student_package findMany
   */
  export type Student_packageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * Filter, which Student_packages to fetch.
     */
    where?: Student_packageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Student_packages to fetch.
     */
    orderBy?: Student_packageOrderByWithRelationInput | Student_packageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Student_packages.
     */
    cursor?: Student_packageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Student_packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Student_packages.
     */
    skip?: number
    distinct?: Student_packageScalarFieldEnum | Student_packageScalarFieldEnum[]
  }

  /**
   * Student_package create
   */
  export type Student_packageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * The data needed to create a Student_package.
     */
    data: XOR<Student_packageCreateInput, Student_packageUncheckedCreateInput>
  }

  /**
   * Student_package createMany
   */
  export type Student_packageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Student_packages.
     */
    data: Student_packageCreateManyInput | Student_packageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student_package createManyAndReturn
   */
  export type Student_packageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Student_packages.
     */
    data: Student_packageCreateManyInput | Student_packageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student_package update
   */
  export type Student_packageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * The data needed to update a Student_package.
     */
    data: XOR<Student_packageUpdateInput, Student_packageUncheckedUpdateInput>
    /**
     * Choose, which Student_package to update.
     */
    where: Student_packageWhereUniqueInput
  }

  /**
   * Student_package updateMany
   */
  export type Student_packageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Student_packages.
     */
    data: XOR<Student_packageUpdateManyMutationInput, Student_packageUncheckedUpdateManyInput>
    /**
     * Filter which Student_packages to update
     */
    where?: Student_packageWhereInput
  }

  /**
   * Student_package upsert
   */
  export type Student_packageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * The filter to search for the Student_package to update in case it exists.
     */
    where: Student_packageWhereUniqueInput
    /**
     * In case the Student_package found by the `where` argument doesn't exist, create a new Student_package with this data.
     */
    create: XOR<Student_packageCreateInput, Student_packageUncheckedCreateInput>
    /**
     * In case the Student_package was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Student_packageUpdateInput, Student_packageUncheckedUpdateInput>
  }

  /**
   * Student_package delete
   */
  export type Student_packageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
    /**
     * Filter which Student_package to delete.
     */
    where: Student_packageWhereUniqueInput
  }

  /**
   * Student_package deleteMany
   */
  export type Student_packageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student_packages to delete
     */
    where?: Student_packageWhereInput
  }

  /**
   * Student_package.Class
   */
  export type Student_package$ClassArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    cursor?: ClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Student_package without action
   */
  export type Student_packageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_package
     */
    select?: Student_packageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Student_packageInclude<ExtArgs> | null
  }


  /**
   * Model Class_group
   */

  export type AggregateClass_group = {
    _count: Class_groupCountAggregateOutputType | null
    _avg: Class_groupAvgAggregateOutputType | null
    _sum: Class_groupSumAggregateOutputType | null
    _min: Class_groupMinAggregateOutputType | null
    _max: Class_groupMaxAggregateOutputType | null
  }

  export type Class_groupAvgAggregateOutputType = {
    id: number | null
  }

  export type Class_groupSumAggregateOutputType = {
    id: number | null
  }

  export type Class_groupMinAggregateOutputType = {
    id: number | null
  }

  export type Class_groupMaxAggregateOutputType = {
    id: number | null
  }

  export type Class_groupCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type Class_groupAvgAggregateInputType = {
    id?: true
  }

  export type Class_groupSumAggregateInputType = {
    id?: true
  }

  export type Class_groupMinAggregateInputType = {
    id?: true
  }

  export type Class_groupMaxAggregateInputType = {
    id?: true
  }

  export type Class_groupCountAggregateInputType = {
    id?: true
    _all?: true
  }

  export type Class_groupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class_group to aggregate.
     */
    where?: Class_groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_groups to fetch.
     */
    orderBy?: Class_groupOrderByWithRelationInput | Class_groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Class_groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Class_groups
    **/
    _count?: true | Class_groupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Class_groupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Class_groupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Class_groupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Class_groupMaxAggregateInputType
  }

  export type GetClass_groupAggregateType<T extends Class_groupAggregateArgs> = {
        [P in keyof T & keyof AggregateClass_group]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass_group[P]>
      : GetScalarType<T[P], AggregateClass_group[P]>
  }




  export type Class_groupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Class_groupWhereInput
    orderBy?: Class_groupOrderByWithAggregationInput | Class_groupOrderByWithAggregationInput[]
    by: Class_groupScalarFieldEnum[] | Class_groupScalarFieldEnum
    having?: Class_groupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Class_groupCountAggregateInputType | true
    _avg?: Class_groupAvgAggregateInputType
    _sum?: Class_groupSumAggregateInputType
    _min?: Class_groupMinAggregateInputType
    _max?: Class_groupMaxAggregateInputType
  }

  export type Class_groupGroupByOutputType = {
    id: number
    _count: Class_groupCountAggregateOutputType | null
    _avg: Class_groupAvgAggregateOutputType | null
    _sum: Class_groupSumAggregateOutputType | null
    _min: Class_groupMinAggregateOutputType | null
    _max: Class_groupMaxAggregateOutputType | null
  }

  type GetClass_groupGroupByPayload<T extends Class_groupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Class_groupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Class_groupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Class_groupGroupByOutputType[P]>
            : GetScalarType<T[P], Class_groupGroupByOutputType[P]>
        }
      >
    >


  export type Class_groupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    GroupOfClasses?: boolean | Class_group$GroupOfClassesArgs<ExtArgs>
    _count?: boolean | Class_groupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class_group"]>

  export type Class_groupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["class_group"]>

  export type Class_groupSelectScalar = {
    id?: boolean
  }

  export type Class_groupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GroupOfClasses?: boolean | Class_group$GroupOfClassesArgs<ExtArgs>
    _count?: boolean | Class_groupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type Class_groupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $Class_groupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class_group"
    objects: {
      GroupOfClasses: Prisma.$ClassPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
    }, ExtArgs["result"]["class_group"]>
    composites: {}
  }

  type Class_groupGetPayload<S extends boolean | null | undefined | Class_groupDefaultArgs> = $Result.GetResult<Prisma.$Class_groupPayload, S>

  type Class_groupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<Class_groupFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Class_groupCountAggregateInputType | true
    }

  export interface Class_groupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class_group'], meta: { name: 'Class_group' } }
    /**
     * Find zero or one Class_group that matches the filter.
     * @param {Class_groupFindUniqueArgs} args - Arguments to find a Class_group
     * @example
     * // Get one Class_group
     * const class_group = await prisma.class_group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Class_groupFindUniqueArgs>(args: SelectSubset<T, Class_groupFindUniqueArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Class_group that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {Class_groupFindUniqueOrThrowArgs} args - Arguments to find a Class_group
     * @example
     * // Get one Class_group
     * const class_group = await prisma.class_group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Class_groupFindUniqueOrThrowArgs>(args: SelectSubset<T, Class_groupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Class_group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_groupFindFirstArgs} args - Arguments to find a Class_group
     * @example
     * // Get one Class_group
     * const class_group = await prisma.class_group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Class_groupFindFirstArgs>(args?: SelectSubset<T, Class_groupFindFirstArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Class_group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_groupFindFirstOrThrowArgs} args - Arguments to find a Class_group
     * @example
     * // Get one Class_group
     * const class_group = await prisma.class_group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Class_groupFindFirstOrThrowArgs>(args?: SelectSubset<T, Class_groupFindFirstOrThrowArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Class_groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_groupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Class_groups
     * const class_groups = await prisma.class_group.findMany()
     * 
     * // Get first 10 Class_groups
     * const class_groups = await prisma.class_group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const class_groupWithIdOnly = await prisma.class_group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Class_groupFindManyArgs>(args?: SelectSubset<T, Class_groupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Class_group.
     * @param {Class_groupCreateArgs} args - Arguments to create a Class_group.
     * @example
     * // Create one Class_group
     * const Class_group = await prisma.class_group.create({
     *   data: {
     *     // ... data to create a Class_group
     *   }
     * })
     * 
     */
    create<T extends Class_groupCreateArgs>(args: SelectSubset<T, Class_groupCreateArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Class_groups.
     * @param {Class_groupCreateManyArgs} args - Arguments to create many Class_groups.
     * @example
     * // Create many Class_groups
     * const class_group = await prisma.class_group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Class_groupCreateManyArgs>(args?: SelectSubset<T, Class_groupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Class_groups and returns the data saved in the database.
     * @param {Class_groupCreateManyAndReturnArgs} args - Arguments to create many Class_groups.
     * @example
     * // Create many Class_groups
     * const class_group = await prisma.class_group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Class_groups and only return the `id`
     * const class_groupWithIdOnly = await prisma.class_group.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Class_groupCreateManyAndReturnArgs>(args?: SelectSubset<T, Class_groupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Class_group.
     * @param {Class_groupDeleteArgs} args - Arguments to delete one Class_group.
     * @example
     * // Delete one Class_group
     * const Class_group = await prisma.class_group.delete({
     *   where: {
     *     // ... filter to delete one Class_group
     *   }
     * })
     * 
     */
    delete<T extends Class_groupDeleteArgs>(args: SelectSubset<T, Class_groupDeleteArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Class_group.
     * @param {Class_groupUpdateArgs} args - Arguments to update one Class_group.
     * @example
     * // Update one Class_group
     * const class_group = await prisma.class_group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Class_groupUpdateArgs>(args: SelectSubset<T, Class_groupUpdateArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Class_groups.
     * @param {Class_groupDeleteManyArgs} args - Arguments to filter Class_groups to delete.
     * @example
     * // Delete a few Class_groups
     * const { count } = await prisma.class_group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Class_groupDeleteManyArgs>(args?: SelectSubset<T, Class_groupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Class_groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_groupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Class_groups
     * const class_group = await prisma.class_group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Class_groupUpdateManyArgs>(args: SelectSubset<T, Class_groupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Class_group.
     * @param {Class_groupUpsertArgs} args - Arguments to update or create a Class_group.
     * @example
     * // Update or create a Class_group
     * const class_group = await prisma.class_group.upsert({
     *   create: {
     *     // ... data to create a Class_group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class_group we want to update
     *   }
     * })
     */
    upsert<T extends Class_groupUpsertArgs>(args: SelectSubset<T, Class_groupUpsertArgs<ExtArgs>>): Prisma__Class_groupClient<$Result.GetResult<Prisma.$Class_groupPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Class_groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_groupCountArgs} args - Arguments to filter Class_groups to count.
     * @example
     * // Count the number of Class_groups
     * const count = await prisma.class_group.count({
     *   where: {
     *     // ... the filter for the Class_groups we want to count
     *   }
     * })
    **/
    count<T extends Class_groupCountArgs>(
      args?: Subset<T, Class_groupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Class_groupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class_group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_groupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Class_groupAggregateArgs>(args: Subset<T, Class_groupAggregateArgs>): Prisma.PrismaPromise<GetClass_groupAggregateType<T>>

    /**
     * Group by Class_group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_groupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Class_groupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Class_groupGroupByArgs['orderBy'] }
        : { orderBy?: Class_groupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Class_groupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClass_groupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class_group model
   */
  readonly fields: Class_groupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class_group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Class_groupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    GroupOfClasses<T extends Class_group$GroupOfClassesArgs<ExtArgs> = {}>(args?: Subset<T, Class_group$GroupOfClassesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class_group model
   */ 
  interface Class_groupFieldRefs {
    readonly id: FieldRef<"Class_group", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Class_group findUnique
   */
  export type Class_groupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * Filter, which Class_group to fetch.
     */
    where: Class_groupWhereUniqueInput
  }

  /**
   * Class_group findUniqueOrThrow
   */
  export type Class_groupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * Filter, which Class_group to fetch.
     */
    where: Class_groupWhereUniqueInput
  }

  /**
   * Class_group findFirst
   */
  export type Class_groupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * Filter, which Class_group to fetch.
     */
    where?: Class_groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_groups to fetch.
     */
    orderBy?: Class_groupOrderByWithRelationInput | Class_groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Class_groups.
     */
    cursor?: Class_groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Class_groups.
     */
    distinct?: Class_groupScalarFieldEnum | Class_groupScalarFieldEnum[]
  }

  /**
   * Class_group findFirstOrThrow
   */
  export type Class_groupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * Filter, which Class_group to fetch.
     */
    where?: Class_groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_groups to fetch.
     */
    orderBy?: Class_groupOrderByWithRelationInput | Class_groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Class_groups.
     */
    cursor?: Class_groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Class_groups.
     */
    distinct?: Class_groupScalarFieldEnum | Class_groupScalarFieldEnum[]
  }

  /**
   * Class_group findMany
   */
  export type Class_groupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * Filter, which Class_groups to fetch.
     */
    where?: Class_groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_groups to fetch.
     */
    orderBy?: Class_groupOrderByWithRelationInput | Class_groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Class_groups.
     */
    cursor?: Class_groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_groups.
     */
    skip?: number
    distinct?: Class_groupScalarFieldEnum | Class_groupScalarFieldEnum[]
  }

  /**
   * Class_group create
   */
  export type Class_groupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * The data needed to create a Class_group.
     */
    data?: XOR<Class_groupCreateInput, Class_groupUncheckedCreateInput>
  }

  /**
   * Class_group createMany
   */
  export type Class_groupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Class_groups.
     */
    data: Class_groupCreateManyInput | Class_groupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class_group createManyAndReturn
   */
  export type Class_groupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Class_groups.
     */
    data: Class_groupCreateManyInput | Class_groupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class_group update
   */
  export type Class_groupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * The data needed to update a Class_group.
     */
    data: XOR<Class_groupUpdateInput, Class_groupUncheckedUpdateInput>
    /**
     * Choose, which Class_group to update.
     */
    where: Class_groupWhereUniqueInput
  }

  /**
   * Class_group updateMany
   */
  export type Class_groupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Class_groups.
     */
    data: XOR<Class_groupUpdateManyMutationInput, Class_groupUncheckedUpdateManyInput>
    /**
     * Filter which Class_groups to update
     */
    where?: Class_groupWhereInput
  }

  /**
   * Class_group upsert
   */
  export type Class_groupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * The filter to search for the Class_group to update in case it exists.
     */
    where: Class_groupWhereUniqueInput
    /**
     * In case the Class_group found by the `where` argument doesn't exist, create a new Class_group with this data.
     */
    create: XOR<Class_groupCreateInput, Class_groupUncheckedCreateInput>
    /**
     * In case the Class_group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Class_groupUpdateInput, Class_groupUncheckedUpdateInput>
  }

  /**
   * Class_group delete
   */
  export type Class_groupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
    /**
     * Filter which Class_group to delete.
     */
    where: Class_groupWhereUniqueInput
  }

  /**
   * Class_group deleteMany
   */
  export type Class_groupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class_groups to delete
     */
    where?: Class_groupWhereInput
  }

  /**
   * Class_group.GroupOfClasses
   */
  export type Class_group$GroupOfClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    cursor?: ClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class_group without action
   */
  export type Class_groupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_group
     */
    select?: Class_groupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_groupInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    chinese_name: 'chinese_name',
    gender: 'gender',
    school_name: 'school_name',
    grade: 'grade',
    phone_number: 'phone_number',
    wechat_id: 'wechat_id',
    birthdate: 'birthdate',
    parent_email: 'parent_email',
    created_at: 'created_at',
    created_at_hk: 'created_at_hk'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const PortfolioScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    name: 'name',
    created_at: 'created_at',
    created_at_hk: 'created_at_hk'
  };

  export type PortfolioScalarFieldEnum = (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum]


  export const Portfolio_to_art_photoScalarFieldEnum: {
    id: 'id',
    portfolio_id: 'portfolio_id',
    photo_url: 'photo_url',
    photo_desc: 'photo_desc'
  };

  export type Portfolio_to_art_photoScalarFieldEnum = (typeof Portfolio_to_art_photoScalarFieldEnum)[keyof typeof Portfolio_to_art_photoScalarFieldEnum]


  export const Login_sessionScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    company_email: 'company_email',
    refresh_token: 'refresh_token',
    is_blocked: 'is_blocked',
    expired_at: 'expired_at',
    created_at: 'created_at',
    created_at_hk: 'created_at_hk'
  };

  export type Login_sessionScalarFieldEnum = (typeof Login_sessionScalarFieldEnum)[keyof typeof Login_sessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    is_blocked: 'is_blocked',
    company_email: 'company_email',
    password_hash: 'password_hash',
    avatar_file_url: 'avatar_file_url',
    created_at: 'created_at',
    mobile_number: 'mobile_number',
    role_in_system: 'role_in_system',
    role_in_company: 'role_in_company',
    created_at_hk: 'created_at_hk'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    created_at_hk: 'created_at_hk',
    course_name: 'course_name'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    id: 'id',
    day_unix_timestamp: 'day_unix_timestamp',
    hour_unix_timestamp: 'hour_unix_timestamp',
    min: 'min',
    created_at: 'created_at',
    created_at_hk: 'created_at_hk',
    class_group_id: 'class_group_id',
    actual_classroom: 'actual_classroom',
    reason_for_absence: 'reason_for_absence',
    class_status: 'class_status',
    student_package_id: 'student_package_id',
    remark: 'remark'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const Student_packageScalarFieldEnum: {
    id: 'id',
    start_date: 'start_date',
    paid_at: 'paid_at',
    official_end_date: 'official_end_date',
    expiry_date: 'expiry_date',
    min: 'min',
    course_id: 'course_id',
    student_id: 'student_id',
    created_at: 'created_at',
    created_at_hk: 'created_at_hk',
    num_of_classes: 'num_of_classes',
    default_classroom: 'default_classroom'
  };

  export type Student_packageScalarFieldEnum = (typeof Student_packageScalarFieldEnum)[keyof typeof Student_packageScalarFieldEnum]


  export const Class_groupScalarFieldEnum: {
    id: 'id'
  };

  export type Class_groupScalarFieldEnum = (typeof Class_groupScalarFieldEnum)[keyof typeof Class_groupScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Class_status'
   */
  export type EnumClass_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Class_status'>
    


  /**
   * Reference to a field of type 'Class_status[]'
   */
  export type ListEnumClass_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Class_status[]'>
    


  /**
   * Reference to a field of type 'Classroom'
   */
  export type EnumClassroomFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Classroom'>
    


  /**
   * Reference to a field of type 'Classroom[]'
   */
  export type ListEnumClassroomFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Classroom[]'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: UuidFilter<"Student"> | string
    first_name?: StringFilter<"Student"> | string
    last_name?: StringFilter<"Student"> | string
    chinese_name?: StringNullableFilter<"Student"> | string | null
    gender?: EnumGenderFilter<"Student"> | $Enums.Gender
    school_name?: StringFilter<"Student"> | string
    grade?: StringFilter<"Student"> | string
    phone_number?: StringNullableFilter<"Student"> | string | null
    wechat_id?: StringNullableFilter<"Student"> | string | null
    birthdate?: FloatFilter<"Student"> | number
    parent_email?: StringFilter<"Student"> | string
    created_at?: FloatFilter<"Student"> | number
    created_at_hk?: StringFilter<"Student"> | string
    Portfolio?: PortfolioListRelationFilter
    Student_package?: Student_packageListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    chinese_name?: SortOrderInput | SortOrder
    gender?: SortOrder
    school_name?: SortOrder
    grade?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    wechat_id?: SortOrderInput | SortOrder
    birthdate?: SortOrder
    parent_email?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    Portfolio?: PortfolioOrderByRelationAggregateInput
    Student_package?: Student_packageOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone_number?: string
    wechat_id?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    first_name?: StringFilter<"Student"> | string
    last_name?: StringFilter<"Student"> | string
    chinese_name?: StringNullableFilter<"Student"> | string | null
    gender?: EnumGenderFilter<"Student"> | $Enums.Gender
    school_name?: StringFilter<"Student"> | string
    grade?: StringFilter<"Student"> | string
    birthdate?: FloatFilter<"Student"> | number
    parent_email?: StringFilter<"Student"> | string
    created_at?: FloatFilter<"Student"> | number
    created_at_hk?: StringFilter<"Student"> | string
    Portfolio?: PortfolioListRelationFilter
    Student_package?: Student_packageListRelationFilter
  }, "id" | "phone_number" | "wechat_id">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    chinese_name?: SortOrderInput | SortOrder
    gender?: SortOrder
    school_name?: SortOrder
    grade?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    wechat_id?: SortOrderInput | SortOrder
    birthdate?: SortOrder
    parent_email?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Student"> | string
    first_name?: StringWithAggregatesFilter<"Student"> | string
    last_name?: StringWithAggregatesFilter<"Student"> | string
    chinese_name?: StringNullableWithAggregatesFilter<"Student"> | string | null
    gender?: EnumGenderWithAggregatesFilter<"Student"> | $Enums.Gender
    school_name?: StringWithAggregatesFilter<"Student"> | string
    grade?: StringWithAggregatesFilter<"Student"> | string
    phone_number?: StringNullableWithAggregatesFilter<"Student"> | string | null
    wechat_id?: StringNullableWithAggregatesFilter<"Student"> | string | null
    birthdate?: FloatWithAggregatesFilter<"Student"> | number
    parent_email?: StringWithAggregatesFilter<"Student"> | string
    created_at?: FloatWithAggregatesFilter<"Student"> | number
    created_at_hk?: StringWithAggregatesFilter<"Student"> | string
  }

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    id?: UuidFilter<"Portfolio"> | string
    student_id?: UuidFilter<"Portfolio"> | string
    name?: StringFilter<"Portfolio"> | string
    created_at?: FloatFilter<"Portfolio"> | number
    created_at_hk?: StringFilter<"Portfolio"> | string
    Student?: XOR<StudentRelationFilter, StudentWhereInput>
    PortfolioToArtPicture?: Portfolio_to_art_photoListRelationFilter
  }

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    Student?: StudentOrderByWithRelationInput
    PortfolioToArtPicture?: Portfolio_to_art_photoOrderByRelationAggregateInput
  }

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    student_id?: UuidFilter<"Portfolio"> | string
    name?: StringFilter<"Portfolio"> | string
    created_at?: FloatFilter<"Portfolio"> | number
    created_at_hk?: StringFilter<"Portfolio"> | string
    Student?: XOR<StudentRelationFilter, StudentWhereInput>
    PortfolioToArtPicture?: Portfolio_to_art_photoListRelationFilter
  }, "id">

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    _count?: PortfolioCountOrderByAggregateInput
    _avg?: PortfolioAvgOrderByAggregateInput
    _max?: PortfolioMaxOrderByAggregateInput
    _min?: PortfolioMinOrderByAggregateInput
    _sum?: PortfolioSumOrderByAggregateInput
  }

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    OR?: PortfolioScalarWhereWithAggregatesInput[]
    NOT?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Portfolio"> | string
    student_id?: UuidWithAggregatesFilter<"Portfolio"> | string
    name?: StringWithAggregatesFilter<"Portfolio"> | string
    created_at?: FloatWithAggregatesFilter<"Portfolio"> | number
    created_at_hk?: StringWithAggregatesFilter<"Portfolio"> | string
  }

  export type Portfolio_to_art_photoWhereInput = {
    AND?: Portfolio_to_art_photoWhereInput | Portfolio_to_art_photoWhereInput[]
    OR?: Portfolio_to_art_photoWhereInput[]
    NOT?: Portfolio_to_art_photoWhereInput | Portfolio_to_art_photoWhereInput[]
    id?: IntFilter<"Portfolio_to_art_photo"> | number
    portfolio_id?: UuidFilter<"Portfolio_to_art_photo"> | string
    photo_url?: StringFilter<"Portfolio_to_art_photo"> | string
    photo_desc?: StringFilter<"Portfolio_to_art_photo"> | string
    Portfolio?: XOR<PortfolioRelationFilter, PortfolioWhereInput>
  }

  export type Portfolio_to_art_photoOrderByWithRelationInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    photo_url?: SortOrder
    photo_desc?: SortOrder
    Portfolio?: PortfolioOrderByWithRelationInput
  }

  export type Portfolio_to_art_photoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Portfolio_to_art_photoWhereInput | Portfolio_to_art_photoWhereInput[]
    OR?: Portfolio_to_art_photoWhereInput[]
    NOT?: Portfolio_to_art_photoWhereInput | Portfolio_to_art_photoWhereInput[]
    portfolio_id?: UuidFilter<"Portfolio_to_art_photo"> | string
    photo_url?: StringFilter<"Portfolio_to_art_photo"> | string
    photo_desc?: StringFilter<"Portfolio_to_art_photo"> | string
    Portfolio?: XOR<PortfolioRelationFilter, PortfolioWhereInput>
  }, "id">

  export type Portfolio_to_art_photoOrderByWithAggregationInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    photo_url?: SortOrder
    photo_desc?: SortOrder
    _count?: Portfolio_to_art_photoCountOrderByAggregateInput
    _avg?: Portfolio_to_art_photoAvgOrderByAggregateInput
    _max?: Portfolio_to_art_photoMaxOrderByAggregateInput
    _min?: Portfolio_to_art_photoMinOrderByAggregateInput
    _sum?: Portfolio_to_art_photoSumOrderByAggregateInput
  }

  export type Portfolio_to_art_photoScalarWhereWithAggregatesInput = {
    AND?: Portfolio_to_art_photoScalarWhereWithAggregatesInput | Portfolio_to_art_photoScalarWhereWithAggregatesInput[]
    OR?: Portfolio_to_art_photoScalarWhereWithAggregatesInput[]
    NOT?: Portfolio_to_art_photoScalarWhereWithAggregatesInput | Portfolio_to_art_photoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Portfolio_to_art_photo"> | number
    portfolio_id?: UuidWithAggregatesFilter<"Portfolio_to_art_photo"> | string
    photo_url?: StringWithAggregatesFilter<"Portfolio_to_art_photo"> | string
    photo_desc?: StringWithAggregatesFilter<"Portfolio_to_art_photo"> | string
  }

  export type Login_sessionWhereInput = {
    AND?: Login_sessionWhereInput | Login_sessionWhereInput[]
    OR?: Login_sessionWhereInput[]
    NOT?: Login_sessionWhereInput | Login_sessionWhereInput[]
    id?: UuidFilter<"Login_session"> | string
    uuid?: UuidFilter<"Login_session"> | string
    company_email?: StringFilter<"Login_session"> | string
    refresh_token?: StringFilter<"Login_session"> | string
    is_blocked?: BoolFilter<"Login_session"> | boolean
    expired_at?: DateTimeFilter<"Login_session"> | Date | string
    created_at?: FloatFilter<"Login_session"> | number
    created_at_hk?: StringFilter<"Login_session"> | string
  }

  export type Login_sessionOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    company_email?: SortOrder
    refresh_token?: SortOrder
    is_blocked?: SortOrder
    expired_at?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type Login_sessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Login_sessionWhereInput | Login_sessionWhereInput[]
    OR?: Login_sessionWhereInput[]
    NOT?: Login_sessionWhereInput | Login_sessionWhereInput[]
    uuid?: UuidFilter<"Login_session"> | string
    company_email?: StringFilter<"Login_session"> | string
    refresh_token?: StringFilter<"Login_session"> | string
    is_blocked?: BoolFilter<"Login_session"> | boolean
    expired_at?: DateTimeFilter<"Login_session"> | Date | string
    created_at?: FloatFilter<"Login_session"> | number
    created_at_hk?: StringFilter<"Login_session"> | string
  }, "id">

  export type Login_sessionOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    company_email?: SortOrder
    refresh_token?: SortOrder
    is_blocked?: SortOrder
    expired_at?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    _count?: Login_sessionCountOrderByAggregateInput
    _avg?: Login_sessionAvgOrderByAggregateInput
    _max?: Login_sessionMaxOrderByAggregateInput
    _min?: Login_sessionMinOrderByAggregateInput
    _sum?: Login_sessionSumOrderByAggregateInput
  }

  export type Login_sessionScalarWhereWithAggregatesInput = {
    AND?: Login_sessionScalarWhereWithAggregatesInput | Login_sessionScalarWhereWithAggregatesInput[]
    OR?: Login_sessionScalarWhereWithAggregatesInput[]
    NOT?: Login_sessionScalarWhereWithAggregatesInput | Login_sessionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Login_session"> | string
    uuid?: UuidWithAggregatesFilter<"Login_session"> | string
    company_email?: StringWithAggregatesFilter<"Login_session"> | string
    refresh_token?: StringWithAggregatesFilter<"Login_session"> | string
    is_blocked?: BoolWithAggregatesFilter<"Login_session"> | boolean
    expired_at?: DateTimeWithAggregatesFilter<"Login_session"> | Date | string
    created_at?: FloatWithAggregatesFilter<"Login_session"> | number
    created_at_hk?: StringWithAggregatesFilter<"Login_session"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    is_blocked?: BoolFilter<"User"> | boolean
    company_email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    avatar_file_url?: StringFilter<"User"> | string
    created_at?: FloatFilter<"User"> | number
    mobile_number?: StringFilter<"User"> | string
    role_in_system?: EnumRoleFilter<"User"> | $Enums.Role
    role_in_company?: StringFilter<"User"> | string
    created_at_hk?: StringFilter<"User"> | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    is_blocked?: SortOrder
    company_email?: SortOrder
    password_hash?: SortOrder
    avatar_file_url?: SortOrder
    created_at?: SortOrder
    mobile_number?: SortOrder
    role_in_system?: SortOrder
    role_in_company?: SortOrder
    created_at_hk?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    company_email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    is_blocked?: BoolFilter<"User"> | boolean
    password_hash?: StringFilter<"User"> | string
    avatar_file_url?: StringFilter<"User"> | string
    created_at?: FloatFilter<"User"> | number
    mobile_number?: StringFilter<"User"> | string
    role_in_system?: EnumRoleFilter<"User"> | $Enums.Role
    role_in_company?: StringFilter<"User"> | string
    created_at_hk?: StringFilter<"User"> | string
  }, "id" | "company_email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    is_blocked?: SortOrder
    company_email?: SortOrder
    password_hash?: SortOrder
    avatar_file_url?: SortOrder
    created_at?: SortOrder
    mobile_number?: SortOrder
    role_in_system?: SortOrder
    role_in_company?: SortOrder
    created_at_hk?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    first_name?: StringWithAggregatesFilter<"User"> | string
    last_name?: StringWithAggregatesFilter<"User"> | string
    is_blocked?: BoolWithAggregatesFilter<"User"> | boolean
    company_email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    avatar_file_url?: StringWithAggregatesFilter<"User"> | string
    created_at?: FloatWithAggregatesFilter<"User"> | number
    mobile_number?: StringWithAggregatesFilter<"User"> | string
    role_in_system?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    role_in_company?: StringWithAggregatesFilter<"User"> | string
    created_at_hk?: StringWithAggregatesFilter<"User"> | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: IntFilter<"Course"> | number
    created_at?: FloatFilter<"Course"> | number
    created_at_hk?: StringFilter<"Course"> | string
    course_name?: StringFilter<"Course"> | string
    Student_package?: Student_packageListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    course_name?: SortOrder
    Student_package?: Student_packageOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    created_at?: FloatFilter<"Course"> | number
    created_at_hk?: StringFilter<"Course"> | string
    course_name?: StringFilter<"Course"> | string
    Student_package?: Student_packageListRelationFilter
  }, "id" | "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    course_name?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Course"> | number
    created_at?: FloatWithAggregatesFilter<"Course"> | number
    created_at_hk?: StringWithAggregatesFilter<"Course"> | string
    course_name?: StringWithAggregatesFilter<"Course"> | string
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    id?: IntFilter<"Class"> | number
    day_unix_timestamp?: FloatFilter<"Class"> | number
    hour_unix_timestamp?: FloatFilter<"Class"> | number
    min?: IntFilter<"Class"> | number
    created_at?: FloatFilter<"Class"> | number
    created_at_hk?: StringFilter<"Class"> | string
    class_group_id?: IntNullableFilter<"Class"> | number | null
    actual_classroom?: StringNullableFilter<"Class"> | string | null
    reason_for_absence?: StringNullableFilter<"Class"> | string | null
    class_status?: EnumClass_statusFilter<"Class"> | $Enums.Class_status
    student_package_id?: IntFilter<"Class"> | number
    remark?: StringNullableFilter<"Class"> | string | null
    Class_group_of_Classes?: XOR<Class_groupNullableRelationFilter, Class_groupWhereInput> | null
    Student_package?: XOR<Student_packageRelationFilter, Student_packageWhereInput>
  }

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder
    day_unix_timestamp?: SortOrder
    hour_unix_timestamp?: SortOrder
    min?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    class_group_id?: SortOrderInput | SortOrder
    actual_classroom?: SortOrderInput | SortOrder
    reason_for_absence?: SortOrderInput | SortOrder
    class_status?: SortOrder
    student_package_id?: SortOrder
    remark?: SortOrderInput | SortOrder
    Class_group_of_Classes?: Class_groupOrderByWithRelationInput
    Student_package?: Student_packageOrderByWithRelationInput
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    id_hour_unix_timestamp?: ClassIdHour_unix_timestampCompoundUniqueInput
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    day_unix_timestamp?: FloatFilter<"Class"> | number
    hour_unix_timestamp?: FloatFilter<"Class"> | number
    min?: IntFilter<"Class"> | number
    created_at?: FloatFilter<"Class"> | number
    created_at_hk?: StringFilter<"Class"> | string
    class_group_id?: IntNullableFilter<"Class"> | number | null
    actual_classroom?: StringNullableFilter<"Class"> | string | null
    reason_for_absence?: StringNullableFilter<"Class"> | string | null
    class_status?: EnumClass_statusFilter<"Class"> | $Enums.Class_status
    student_package_id?: IntFilter<"Class"> | number
    remark?: StringNullableFilter<"Class"> | string | null
    Class_group_of_Classes?: XOR<Class_groupNullableRelationFilter, Class_groupWhereInput> | null
    Student_package?: XOR<Student_packageRelationFilter, Student_packageWhereInput>
  }, "id" | "id_hour_unix_timestamp">

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder
    day_unix_timestamp?: SortOrder
    hour_unix_timestamp?: SortOrder
    min?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    class_group_id?: SortOrderInput | SortOrder
    actual_classroom?: SortOrderInput | SortOrder
    reason_for_absence?: SortOrderInput | SortOrder
    class_status?: SortOrder
    student_package_id?: SortOrder
    remark?: SortOrderInput | SortOrder
    _count?: ClassCountOrderByAggregateInput
    _avg?: ClassAvgOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
    _sum?: ClassSumOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class"> | number
    day_unix_timestamp?: FloatWithAggregatesFilter<"Class"> | number
    hour_unix_timestamp?: FloatWithAggregatesFilter<"Class"> | number
    min?: IntWithAggregatesFilter<"Class"> | number
    created_at?: FloatWithAggregatesFilter<"Class"> | number
    created_at_hk?: StringWithAggregatesFilter<"Class"> | string
    class_group_id?: IntNullableWithAggregatesFilter<"Class"> | number | null
    actual_classroom?: StringNullableWithAggregatesFilter<"Class"> | string | null
    reason_for_absence?: StringNullableWithAggregatesFilter<"Class"> | string | null
    class_status?: EnumClass_statusWithAggregatesFilter<"Class"> | $Enums.Class_status
    student_package_id?: IntWithAggregatesFilter<"Class"> | number
    remark?: StringNullableWithAggregatesFilter<"Class"> | string | null
  }

  export type Student_packageWhereInput = {
    AND?: Student_packageWhereInput | Student_packageWhereInput[]
    OR?: Student_packageWhereInput[]
    NOT?: Student_packageWhereInput | Student_packageWhereInput[]
    id?: IntFilter<"Student_package"> | number
    start_date?: FloatFilter<"Student_package"> | number
    paid_at?: FloatNullableFilter<"Student_package"> | number | null
    official_end_date?: FloatNullableFilter<"Student_package"> | number | null
    expiry_date?: FloatFilter<"Student_package"> | number
    min?: IntFilter<"Student_package"> | number
    course_id?: IntFilter<"Student_package"> | number
    student_id?: UuidFilter<"Student_package"> | string
    created_at?: FloatFilter<"Student_package"> | number
    created_at_hk?: StringFilter<"Student_package"> | string
    num_of_classes?: IntFilter<"Student_package"> | number
    default_classroom?: EnumClassroomFilter<"Student_package"> | $Enums.Classroom
    Class?: ClassListRelationFilter
    Course?: XOR<CourseRelationFilter, CourseWhereInput>
    Student?: XOR<StudentRelationFilter, StudentWhereInput>
  }

  export type Student_packageOrderByWithRelationInput = {
    id?: SortOrder
    start_date?: SortOrder
    paid_at?: SortOrderInput | SortOrder
    official_end_date?: SortOrderInput | SortOrder
    expiry_date?: SortOrder
    min?: SortOrder
    course_id?: SortOrder
    student_id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    num_of_classes?: SortOrder
    default_classroom?: SortOrder
    Class?: ClassOrderByRelationAggregateInput
    Course?: CourseOrderByWithRelationInput
    Student?: StudentOrderByWithRelationInput
  }

  export type Student_packageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Student_packageWhereInput | Student_packageWhereInput[]
    OR?: Student_packageWhereInput[]
    NOT?: Student_packageWhereInput | Student_packageWhereInput[]
    start_date?: FloatFilter<"Student_package"> | number
    paid_at?: FloatNullableFilter<"Student_package"> | number | null
    official_end_date?: FloatNullableFilter<"Student_package"> | number | null
    expiry_date?: FloatFilter<"Student_package"> | number
    min?: IntFilter<"Student_package"> | number
    course_id?: IntFilter<"Student_package"> | number
    student_id?: UuidFilter<"Student_package"> | string
    created_at?: FloatFilter<"Student_package"> | number
    created_at_hk?: StringFilter<"Student_package"> | string
    num_of_classes?: IntFilter<"Student_package"> | number
    default_classroom?: EnumClassroomFilter<"Student_package"> | $Enums.Classroom
    Class?: ClassListRelationFilter
    Course?: XOR<CourseRelationFilter, CourseWhereInput>
    Student?: XOR<StudentRelationFilter, StudentWhereInput>
  }, "id">

  export type Student_packageOrderByWithAggregationInput = {
    id?: SortOrder
    start_date?: SortOrder
    paid_at?: SortOrderInput | SortOrder
    official_end_date?: SortOrderInput | SortOrder
    expiry_date?: SortOrder
    min?: SortOrder
    course_id?: SortOrder
    student_id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    num_of_classes?: SortOrder
    default_classroom?: SortOrder
    _count?: Student_packageCountOrderByAggregateInput
    _avg?: Student_packageAvgOrderByAggregateInput
    _max?: Student_packageMaxOrderByAggregateInput
    _min?: Student_packageMinOrderByAggregateInput
    _sum?: Student_packageSumOrderByAggregateInput
  }

  export type Student_packageScalarWhereWithAggregatesInput = {
    AND?: Student_packageScalarWhereWithAggregatesInput | Student_packageScalarWhereWithAggregatesInput[]
    OR?: Student_packageScalarWhereWithAggregatesInput[]
    NOT?: Student_packageScalarWhereWithAggregatesInput | Student_packageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student_package"> | number
    start_date?: FloatWithAggregatesFilter<"Student_package"> | number
    paid_at?: FloatNullableWithAggregatesFilter<"Student_package"> | number | null
    official_end_date?: FloatNullableWithAggregatesFilter<"Student_package"> | number | null
    expiry_date?: FloatWithAggregatesFilter<"Student_package"> | number
    min?: IntWithAggregatesFilter<"Student_package"> | number
    course_id?: IntWithAggregatesFilter<"Student_package"> | number
    student_id?: UuidWithAggregatesFilter<"Student_package"> | string
    created_at?: FloatWithAggregatesFilter<"Student_package"> | number
    created_at_hk?: StringWithAggregatesFilter<"Student_package"> | string
    num_of_classes?: IntWithAggregatesFilter<"Student_package"> | number
    default_classroom?: EnumClassroomWithAggregatesFilter<"Student_package"> | $Enums.Classroom
  }

  export type Class_groupWhereInput = {
    AND?: Class_groupWhereInput | Class_groupWhereInput[]
    OR?: Class_groupWhereInput[]
    NOT?: Class_groupWhereInput | Class_groupWhereInput[]
    id?: IntFilter<"Class_group"> | number
    GroupOfClasses?: ClassListRelationFilter
  }

  export type Class_groupOrderByWithRelationInput = {
    id?: SortOrder
    GroupOfClasses?: ClassOrderByRelationAggregateInput
  }

  export type Class_groupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Class_groupWhereInput | Class_groupWhereInput[]
    OR?: Class_groupWhereInput[]
    NOT?: Class_groupWhereInput | Class_groupWhereInput[]
    GroupOfClasses?: ClassListRelationFilter
  }, "id">

  export type Class_groupOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: Class_groupCountOrderByAggregateInput
    _avg?: Class_groupAvgOrderByAggregateInput
    _max?: Class_groupMaxOrderByAggregateInput
    _min?: Class_groupMinOrderByAggregateInput
    _sum?: Class_groupSumOrderByAggregateInput
  }

  export type Class_groupScalarWhereWithAggregatesInput = {
    AND?: Class_groupScalarWhereWithAggregatesInput | Class_groupScalarWhereWithAggregatesInput[]
    OR?: Class_groupScalarWhereWithAggregatesInput[]
    NOT?: Class_groupScalarWhereWithAggregatesInput | Class_groupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class_group"> | number
  }

  export type StudentCreateInput = {
    id?: string
    first_name: string
    last_name: string
    chinese_name?: string | null
    gender: $Enums.Gender
    school_name: string
    grade: string
    phone_number?: string | null
    wechat_id?: string | null
    birthdate: number
    parent_email: string
    created_at?: number
    created_at_hk?: string
    Portfolio?: PortfolioCreateNestedManyWithoutStudentInput
    Student_package?: Student_packageCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    first_name: string
    last_name: string
    chinese_name?: string | null
    gender: $Enums.Gender
    school_name: string
    grade: string
    phone_number?: string | null
    wechat_id?: string | null
    birthdate: number
    parent_email: string
    created_at?: number
    created_at_hk?: string
    Portfolio?: PortfolioUncheckedCreateNestedManyWithoutStudentInput
    Student_package?: Student_packageUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    chinese_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    school_name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    wechat_id?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: FloatFieldUpdateOperationsInput | number
    parent_email?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    Portfolio?: PortfolioUpdateManyWithoutStudentNestedInput
    Student_package?: Student_packageUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    chinese_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    school_name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    wechat_id?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: FloatFieldUpdateOperationsInput | number
    parent_email?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    Portfolio?: PortfolioUncheckedUpdateManyWithoutStudentNestedInput
    Student_package?: Student_packageUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    first_name: string
    last_name: string
    chinese_name?: string | null
    gender: $Enums.Gender
    school_name: string
    grade: string
    phone_number?: string | null
    wechat_id?: string | null
    birthdate: number
    parent_email: string
    created_at?: number
    created_at_hk?: string
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    chinese_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    school_name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    wechat_id?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: FloatFieldUpdateOperationsInput | number
    parent_email?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    chinese_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    school_name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    wechat_id?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: FloatFieldUpdateOperationsInput | number
    parent_email?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type PortfolioCreateInput = {
    id?: string
    name: string
    created_at?: number
    created_at_hk?: string
    Student: StudentCreateNestedOneWithoutPortfolioInput
    PortfolioToArtPicture?: Portfolio_to_art_photoCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateInput = {
    id?: string
    student_id: string
    name: string
    created_at?: number
    created_at_hk?: string
    PortfolioToArtPicture?: Portfolio_to_art_photoUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    Student?: StudentUpdateOneRequiredWithoutPortfolioNestedInput
    PortfolioToArtPicture?: Portfolio_to_art_photoUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    PortfolioToArtPicture?: Portfolio_to_art_photoUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioCreateManyInput = {
    id?: string
    student_id: string
    name: string
    created_at?: number
    created_at_hk?: string
  }

  export type PortfolioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type PortfolioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type Portfolio_to_art_photoCreateInput = {
    photo_url: string
    photo_desc: string
    Portfolio: PortfolioCreateNestedOneWithoutPortfolioToArtPictureInput
  }

  export type Portfolio_to_art_photoUncheckedCreateInput = {
    id?: number
    portfolio_id: string
    photo_url: string
    photo_desc: string
  }

  export type Portfolio_to_art_photoUpdateInput = {
    photo_url?: StringFieldUpdateOperationsInput | string
    photo_desc?: StringFieldUpdateOperationsInput | string
    Portfolio?: PortfolioUpdateOneRequiredWithoutPortfolioToArtPictureNestedInput
  }

  export type Portfolio_to_art_photoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    portfolio_id?: StringFieldUpdateOperationsInput | string
    photo_url?: StringFieldUpdateOperationsInput | string
    photo_desc?: StringFieldUpdateOperationsInput | string
  }

  export type Portfolio_to_art_photoCreateManyInput = {
    id?: number
    portfolio_id: string
    photo_url: string
    photo_desc: string
  }

  export type Portfolio_to_art_photoUpdateManyMutationInput = {
    photo_url?: StringFieldUpdateOperationsInput | string
    photo_desc?: StringFieldUpdateOperationsInput | string
  }

  export type Portfolio_to_art_photoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    portfolio_id?: StringFieldUpdateOperationsInput | string
    photo_url?: StringFieldUpdateOperationsInput | string
    photo_desc?: StringFieldUpdateOperationsInput | string
  }

  export type Login_sessionCreateInput = {
    id?: string
    uuid?: string
    company_email: string
    refresh_token: string
    is_blocked: boolean
    expired_at: Date | string
    created_at?: number
    created_at_hk?: string
  }

  export type Login_sessionUncheckedCreateInput = {
    id?: string
    uuid?: string
    company_email: string
    refresh_token: string
    is_blocked: boolean
    expired_at: Date | string
    created_at?: number
    created_at_hk?: string
  }

  export type Login_sessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    company_email?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    is_blocked?: BoolFieldUpdateOperationsInput | boolean
    expired_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type Login_sessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    company_email?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    is_blocked?: BoolFieldUpdateOperationsInput | boolean
    expired_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type Login_sessionCreateManyInput = {
    id?: string
    uuid?: string
    company_email: string
    refresh_token: string
    is_blocked: boolean
    expired_at: Date | string
    created_at?: number
    created_at_hk?: string
  }

  export type Login_sessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    company_email?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    is_blocked?: BoolFieldUpdateOperationsInput | boolean
    expired_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type Login_sessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    company_email?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    is_blocked?: BoolFieldUpdateOperationsInput | boolean
    expired_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    first_name: string
    last_name: string
    is_blocked: boolean
    company_email: string
    password_hash: string
    avatar_file_url: string
    created_at?: number
    mobile_number: string
    role_in_system: $Enums.Role
    role_in_company: string
    created_at_hk?: string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    first_name: string
    last_name: string
    is_blocked: boolean
    company_email: string
    password_hash: string
    avatar_file_url: string
    created_at?: number
    mobile_number: string
    role_in_system: $Enums.Role
    role_in_company: string
    created_at_hk?: string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    is_blocked?: BoolFieldUpdateOperationsInput | boolean
    company_email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    avatar_file_url?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    mobile_number?: StringFieldUpdateOperationsInput | string
    role_in_system?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    role_in_company?: StringFieldUpdateOperationsInput | string
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    is_blocked?: BoolFieldUpdateOperationsInput | boolean
    company_email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    avatar_file_url?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    mobile_number?: StringFieldUpdateOperationsInput | string
    role_in_system?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    role_in_company?: StringFieldUpdateOperationsInput | string
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyInput = {
    id?: string
    first_name: string
    last_name: string
    is_blocked: boolean
    company_email: string
    password_hash: string
    avatar_file_url: string
    created_at?: number
    mobile_number: string
    role_in_system: $Enums.Role
    role_in_company: string
    created_at_hk?: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    is_blocked?: BoolFieldUpdateOperationsInput | boolean
    company_email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    avatar_file_url?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    mobile_number?: StringFieldUpdateOperationsInput | string
    role_in_system?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    role_in_company?: StringFieldUpdateOperationsInput | string
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    is_blocked?: BoolFieldUpdateOperationsInput | boolean
    company_email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    avatar_file_url?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    mobile_number?: StringFieldUpdateOperationsInput | string
    role_in_system?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    role_in_company?: StringFieldUpdateOperationsInput | string
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type CourseCreateInput = {
    created_at?: number
    created_at_hk?: string
    course_name: string
    Student_package?: Student_packageCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: number
    created_at?: number
    created_at_hk?: string
    course_name: string
    Student_package?: Student_packageUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    Student_package?: Student_packageUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    Student_package?: Student_packageUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: number
    created_at?: number
    created_at_hk?: string
    course_name: string
  }

  export type CourseUpdateManyMutationInput = {
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
  }

  export type ClassCreateInput = {
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    remark?: string | null
    Class_group_of_Classes?: Class_groupCreateNestedOneWithoutGroupOfClassesInput
    Student_package: Student_packageCreateNestedOneWithoutClassInput
  }

  export type ClassUncheckedCreateInput = {
    id?: number
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    class_group_id?: number | null
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    student_package_id: number
    remark?: string | null
  }

  export type ClassUpdateInput = {
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    Class_group_of_Classes?: Class_groupUpdateOneWithoutGroupOfClassesNestedInput
    Student_package?: Student_packageUpdateOneRequiredWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    class_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    student_package_id?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassCreateManyInput = {
    id?: number
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    class_group_id?: number | null
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    student_package_id: number
    remark?: string | null
  }

  export type ClassUpdateManyMutationInput = {
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    remark?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    class_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    student_package_id?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Student_packageCreateInput = {
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
    Class?: ClassCreateNestedManyWithoutStudent_packageInput
    Course: CourseCreateNestedOneWithoutStudent_packageInput
    Student: StudentCreateNestedOneWithoutStudent_packageInput
  }

  export type Student_packageUncheckedCreateInput = {
    id?: number
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    course_id: number
    student_id: string
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
    Class?: ClassUncheckedCreateNestedManyWithoutStudent_packageInput
  }

  export type Student_packageUpdateInput = {
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
    Class?: ClassUpdateManyWithoutStudent_packageNestedInput
    Course?: CourseUpdateOneRequiredWithoutStudent_packageNestedInput
    Student?: StudentUpdateOneRequiredWithoutStudent_packageNestedInput
  }

  export type Student_packageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    course_id?: IntFieldUpdateOperationsInput | number
    student_id?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
    Class?: ClassUncheckedUpdateManyWithoutStudent_packageNestedInput
  }

  export type Student_packageCreateManyInput = {
    id?: number
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    course_id: number
    student_id: string
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
  }

  export type Student_packageUpdateManyMutationInput = {
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
  }

  export type Student_packageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    course_id?: IntFieldUpdateOperationsInput | number
    student_id?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
  }

  export type Class_groupCreateInput = {
    GroupOfClasses?: ClassCreateNestedManyWithoutClass_group_of_ClassesInput
  }

  export type Class_groupUncheckedCreateInput = {
    id?: number
    GroupOfClasses?: ClassUncheckedCreateNestedManyWithoutClass_group_of_ClassesInput
  }

  export type Class_groupUpdateInput = {
    GroupOfClasses?: ClassUpdateManyWithoutClass_group_of_ClassesNestedInput
  }

  export type Class_groupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    GroupOfClasses?: ClassUncheckedUpdateManyWithoutClass_group_of_ClassesNestedInput
  }

  export type Class_groupCreateManyInput = {
    id?: number
  }

  export type Class_groupUpdateManyMutationInput = {

  }

  export type Class_groupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput
    some?: PortfolioWhereInput
    none?: PortfolioWhereInput
  }

  export type Student_packageListRelationFilter = {
    every?: Student_packageWhereInput
    some?: Student_packageWhereInput
    none?: Student_packageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Student_packageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    chinese_name?: SortOrder
    gender?: SortOrder
    school_name?: SortOrder
    grade?: SortOrder
    phone_number?: SortOrder
    wechat_id?: SortOrder
    birthdate?: SortOrder
    parent_email?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    birthdate?: SortOrder
    created_at?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    chinese_name?: SortOrder
    gender?: SortOrder
    school_name?: SortOrder
    grade?: SortOrder
    phone_number?: SortOrder
    wechat_id?: SortOrder
    birthdate?: SortOrder
    parent_email?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    chinese_name?: SortOrder
    gender?: SortOrder
    school_name?: SortOrder
    grade?: SortOrder
    phone_number?: SortOrder
    wechat_id?: SortOrder
    birthdate?: SortOrder
    parent_email?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    birthdate?: SortOrder
    created_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StudentRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type Portfolio_to_art_photoListRelationFilter = {
    every?: Portfolio_to_art_photoWhereInput
    some?: Portfolio_to_art_photoWhereInput
    none?: Portfolio_to_art_photoWhereInput
  }

  export type Portfolio_to_art_photoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type PortfolioAvgOrderByAggregateInput = {
    created_at?: SortOrder
  }

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type PortfolioSumOrderByAggregateInput = {
    created_at?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PortfolioRelationFilter = {
    is?: PortfolioWhereInput
    isNot?: PortfolioWhereInput
  }

  export type Portfolio_to_art_photoCountOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    photo_url?: SortOrder
    photo_desc?: SortOrder
  }

  export type Portfolio_to_art_photoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Portfolio_to_art_photoMaxOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    photo_url?: SortOrder
    photo_desc?: SortOrder
  }

  export type Portfolio_to_art_photoMinOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    photo_url?: SortOrder
    photo_desc?: SortOrder
  }

  export type Portfolio_to_art_photoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Login_sessionCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    company_email?: SortOrder
    refresh_token?: SortOrder
    is_blocked?: SortOrder
    expired_at?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type Login_sessionAvgOrderByAggregateInput = {
    created_at?: SortOrder
  }

  export type Login_sessionMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    company_email?: SortOrder
    refresh_token?: SortOrder
    is_blocked?: SortOrder
    expired_at?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type Login_sessionMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    company_email?: SortOrder
    refresh_token?: SortOrder
    is_blocked?: SortOrder
    expired_at?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
  }

  export type Login_sessionSumOrderByAggregateInput = {
    created_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    is_blocked?: SortOrder
    company_email?: SortOrder
    password_hash?: SortOrder
    avatar_file_url?: SortOrder
    created_at?: SortOrder
    mobile_number?: SortOrder
    role_in_system?: SortOrder
    role_in_company?: SortOrder
    created_at_hk?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    created_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    is_blocked?: SortOrder
    company_email?: SortOrder
    password_hash?: SortOrder
    avatar_file_url?: SortOrder
    created_at?: SortOrder
    mobile_number?: SortOrder
    role_in_system?: SortOrder
    role_in_company?: SortOrder
    created_at_hk?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    is_blocked?: SortOrder
    company_email?: SortOrder
    password_hash?: SortOrder
    avatar_file_url?: SortOrder
    created_at?: SortOrder
    mobile_number?: SortOrder
    role_in_system?: SortOrder
    role_in_company?: SortOrder
    created_at_hk?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    created_at?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    course_name?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    course_name?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    course_name?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumClass_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.Class_status | EnumClass_statusFieldRefInput<$PrismaModel>
    in?: $Enums.Class_status[] | ListEnumClass_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Class_status[] | ListEnumClass_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumClass_statusFilter<$PrismaModel> | $Enums.Class_status
  }

  export type Class_groupNullableRelationFilter = {
    is?: Class_groupWhereInput | null
    isNot?: Class_groupWhereInput | null
  }

  export type Student_packageRelationFilter = {
    is?: Student_packageWhereInput
    isNot?: Student_packageWhereInput
  }

  export type ClassIdHour_unix_timestampCompoundUniqueInput = {
    id: number
    hour_unix_timestamp: number
  }

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder
    day_unix_timestamp?: SortOrder
    hour_unix_timestamp?: SortOrder
    min?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    class_group_id?: SortOrder
    actual_classroom?: SortOrder
    reason_for_absence?: SortOrder
    class_status?: SortOrder
    student_package_id?: SortOrder
    remark?: SortOrder
  }

  export type ClassAvgOrderByAggregateInput = {
    id?: SortOrder
    day_unix_timestamp?: SortOrder
    hour_unix_timestamp?: SortOrder
    min?: SortOrder
    created_at?: SortOrder
    class_group_id?: SortOrder
    student_package_id?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder
    day_unix_timestamp?: SortOrder
    hour_unix_timestamp?: SortOrder
    min?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    class_group_id?: SortOrder
    actual_classroom?: SortOrder
    reason_for_absence?: SortOrder
    class_status?: SortOrder
    student_package_id?: SortOrder
    remark?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder
    day_unix_timestamp?: SortOrder
    hour_unix_timestamp?: SortOrder
    min?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    class_group_id?: SortOrder
    actual_classroom?: SortOrder
    reason_for_absence?: SortOrder
    class_status?: SortOrder
    student_package_id?: SortOrder
    remark?: SortOrder
  }

  export type ClassSumOrderByAggregateInput = {
    id?: SortOrder
    day_unix_timestamp?: SortOrder
    hour_unix_timestamp?: SortOrder
    min?: SortOrder
    created_at?: SortOrder
    class_group_id?: SortOrder
    student_package_id?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumClass_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Class_status | EnumClass_statusFieldRefInput<$PrismaModel>
    in?: $Enums.Class_status[] | ListEnumClass_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Class_status[] | ListEnumClass_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumClass_statusWithAggregatesFilter<$PrismaModel> | $Enums.Class_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClass_statusFilter<$PrismaModel>
    _max?: NestedEnumClass_statusFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumClassroomFilter<$PrismaModel = never> = {
    equals?: $Enums.Classroom | EnumClassroomFieldRefInput<$PrismaModel>
    in?: $Enums.Classroom[] | ListEnumClassroomFieldRefInput<$PrismaModel>
    notIn?: $Enums.Classroom[] | ListEnumClassroomFieldRefInput<$PrismaModel>
    not?: NestedEnumClassroomFilter<$PrismaModel> | $Enums.Classroom
  }

  export type ClassListRelationFilter = {
    every?: ClassWhereInput
    some?: ClassWhereInput
    none?: ClassWhereInput
  }

  export type CourseRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type ClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Student_packageCountOrderByAggregateInput = {
    id?: SortOrder
    start_date?: SortOrder
    paid_at?: SortOrder
    official_end_date?: SortOrder
    expiry_date?: SortOrder
    min?: SortOrder
    course_id?: SortOrder
    student_id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    num_of_classes?: SortOrder
    default_classroom?: SortOrder
  }

  export type Student_packageAvgOrderByAggregateInput = {
    id?: SortOrder
    start_date?: SortOrder
    paid_at?: SortOrder
    official_end_date?: SortOrder
    expiry_date?: SortOrder
    min?: SortOrder
    course_id?: SortOrder
    created_at?: SortOrder
    num_of_classes?: SortOrder
  }

  export type Student_packageMaxOrderByAggregateInput = {
    id?: SortOrder
    start_date?: SortOrder
    paid_at?: SortOrder
    official_end_date?: SortOrder
    expiry_date?: SortOrder
    min?: SortOrder
    course_id?: SortOrder
    student_id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    num_of_classes?: SortOrder
    default_classroom?: SortOrder
  }

  export type Student_packageMinOrderByAggregateInput = {
    id?: SortOrder
    start_date?: SortOrder
    paid_at?: SortOrder
    official_end_date?: SortOrder
    expiry_date?: SortOrder
    min?: SortOrder
    course_id?: SortOrder
    student_id?: SortOrder
    created_at?: SortOrder
    created_at_hk?: SortOrder
    num_of_classes?: SortOrder
    default_classroom?: SortOrder
  }

  export type Student_packageSumOrderByAggregateInput = {
    id?: SortOrder
    start_date?: SortOrder
    paid_at?: SortOrder
    official_end_date?: SortOrder
    expiry_date?: SortOrder
    min?: SortOrder
    course_id?: SortOrder
    created_at?: SortOrder
    num_of_classes?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumClassroomWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Classroom | EnumClassroomFieldRefInput<$PrismaModel>
    in?: $Enums.Classroom[] | ListEnumClassroomFieldRefInput<$PrismaModel>
    notIn?: $Enums.Classroom[] | ListEnumClassroomFieldRefInput<$PrismaModel>
    not?: NestedEnumClassroomWithAggregatesFilter<$PrismaModel> | $Enums.Classroom
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClassroomFilter<$PrismaModel>
    _max?: NestedEnumClassroomFilter<$PrismaModel>
  }

  export type Class_groupCountOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Class_groupAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Class_groupMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Class_groupMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Class_groupSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PortfolioCreateNestedManyWithoutStudentInput = {
    create?: XOR<PortfolioCreateWithoutStudentInput, PortfolioUncheckedCreateWithoutStudentInput> | PortfolioCreateWithoutStudentInput[] | PortfolioUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutStudentInput | PortfolioCreateOrConnectWithoutStudentInput[]
    createMany?: PortfolioCreateManyStudentInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type Student_packageCreateNestedManyWithoutStudentInput = {
    create?: XOR<Student_packageCreateWithoutStudentInput, Student_packageUncheckedCreateWithoutStudentInput> | Student_packageCreateWithoutStudentInput[] | Student_packageUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Student_packageCreateOrConnectWithoutStudentInput | Student_packageCreateOrConnectWithoutStudentInput[]
    createMany?: Student_packageCreateManyStudentInputEnvelope
    connect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<PortfolioCreateWithoutStudentInput, PortfolioUncheckedCreateWithoutStudentInput> | PortfolioCreateWithoutStudentInput[] | PortfolioUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutStudentInput | PortfolioCreateOrConnectWithoutStudentInput[]
    createMany?: PortfolioCreateManyStudentInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type Student_packageUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<Student_packageCreateWithoutStudentInput, Student_packageUncheckedCreateWithoutStudentInput> | Student_packageCreateWithoutStudentInput[] | Student_packageUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Student_packageCreateOrConnectWithoutStudentInput | Student_packageCreateOrConnectWithoutStudentInput[]
    createMany?: Student_packageCreateManyStudentInputEnvelope
    connect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PortfolioUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PortfolioCreateWithoutStudentInput, PortfolioUncheckedCreateWithoutStudentInput> | PortfolioCreateWithoutStudentInput[] | PortfolioUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutStudentInput | PortfolioCreateOrConnectWithoutStudentInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutStudentInput | PortfolioUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PortfolioCreateManyStudentInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutStudentInput | PortfolioUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutStudentInput | PortfolioUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type Student_packageUpdateManyWithoutStudentNestedInput = {
    create?: XOR<Student_packageCreateWithoutStudentInput, Student_packageUncheckedCreateWithoutStudentInput> | Student_packageCreateWithoutStudentInput[] | Student_packageUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Student_packageCreateOrConnectWithoutStudentInput | Student_packageCreateOrConnectWithoutStudentInput[]
    upsert?: Student_packageUpsertWithWhereUniqueWithoutStudentInput | Student_packageUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: Student_packageCreateManyStudentInputEnvelope
    set?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    disconnect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    delete?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    connect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    update?: Student_packageUpdateWithWhereUniqueWithoutStudentInput | Student_packageUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: Student_packageUpdateManyWithWhereWithoutStudentInput | Student_packageUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: Student_packageScalarWhereInput | Student_packageScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PortfolioCreateWithoutStudentInput, PortfolioUncheckedCreateWithoutStudentInput> | PortfolioCreateWithoutStudentInput[] | PortfolioUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutStudentInput | PortfolioCreateOrConnectWithoutStudentInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutStudentInput | PortfolioUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PortfolioCreateManyStudentInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutStudentInput | PortfolioUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutStudentInput | PortfolioUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type Student_packageUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<Student_packageCreateWithoutStudentInput, Student_packageUncheckedCreateWithoutStudentInput> | Student_packageCreateWithoutStudentInput[] | Student_packageUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Student_packageCreateOrConnectWithoutStudentInput | Student_packageCreateOrConnectWithoutStudentInput[]
    upsert?: Student_packageUpsertWithWhereUniqueWithoutStudentInput | Student_packageUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: Student_packageCreateManyStudentInputEnvelope
    set?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    disconnect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    delete?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    connect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    update?: Student_packageUpdateWithWhereUniqueWithoutStudentInput | Student_packageUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: Student_packageUpdateManyWithWhereWithoutStudentInput | Student_packageUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: Student_packageScalarWhereInput | Student_packageScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutPortfolioInput = {
    create?: XOR<StudentCreateWithoutPortfolioInput, StudentUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPortfolioInput
    connect?: StudentWhereUniqueInput
  }

  export type Portfolio_to_art_photoCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<Portfolio_to_art_photoCreateWithoutPortfolioInput, Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput> | Portfolio_to_art_photoCreateWithoutPortfolioInput[] | Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput | Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput[]
    createMany?: Portfolio_to_art_photoCreateManyPortfolioInputEnvelope
    connect?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
  }

  export type Portfolio_to_art_photoUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<Portfolio_to_art_photoCreateWithoutPortfolioInput, Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput> | Portfolio_to_art_photoCreateWithoutPortfolioInput[] | Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput | Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput[]
    createMany?: Portfolio_to_art_photoCreateManyPortfolioInputEnvelope
    connect?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
  }

  export type StudentUpdateOneRequiredWithoutPortfolioNestedInput = {
    create?: XOR<StudentCreateWithoutPortfolioInput, StudentUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPortfolioInput
    upsert?: StudentUpsertWithoutPortfolioInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutPortfolioInput, StudentUpdateWithoutPortfolioInput>, StudentUncheckedUpdateWithoutPortfolioInput>
  }

  export type Portfolio_to_art_photoUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<Portfolio_to_art_photoCreateWithoutPortfolioInput, Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput> | Portfolio_to_art_photoCreateWithoutPortfolioInput[] | Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput | Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput[]
    upsert?: Portfolio_to_art_photoUpsertWithWhereUniqueWithoutPortfolioInput | Portfolio_to_art_photoUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: Portfolio_to_art_photoCreateManyPortfolioInputEnvelope
    set?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
    disconnect?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
    delete?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
    connect?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
    update?: Portfolio_to_art_photoUpdateWithWhereUniqueWithoutPortfolioInput | Portfolio_to_art_photoUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: Portfolio_to_art_photoUpdateManyWithWhereWithoutPortfolioInput | Portfolio_to_art_photoUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: Portfolio_to_art_photoScalarWhereInput | Portfolio_to_art_photoScalarWhereInput[]
  }

  export type Portfolio_to_art_photoUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<Portfolio_to_art_photoCreateWithoutPortfolioInput, Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput> | Portfolio_to_art_photoCreateWithoutPortfolioInput[] | Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput | Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput[]
    upsert?: Portfolio_to_art_photoUpsertWithWhereUniqueWithoutPortfolioInput | Portfolio_to_art_photoUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: Portfolio_to_art_photoCreateManyPortfolioInputEnvelope
    set?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
    disconnect?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
    delete?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
    connect?: Portfolio_to_art_photoWhereUniqueInput | Portfolio_to_art_photoWhereUniqueInput[]
    update?: Portfolio_to_art_photoUpdateWithWhereUniqueWithoutPortfolioInput | Portfolio_to_art_photoUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: Portfolio_to_art_photoUpdateManyWithWhereWithoutPortfolioInput | Portfolio_to_art_photoUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: Portfolio_to_art_photoScalarWhereInput | Portfolio_to_art_photoScalarWhereInput[]
  }

  export type PortfolioCreateNestedOneWithoutPortfolioToArtPictureInput = {
    create?: XOR<PortfolioCreateWithoutPortfolioToArtPictureInput, PortfolioUncheckedCreateWithoutPortfolioToArtPictureInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutPortfolioToArtPictureInput
    connect?: PortfolioWhereUniqueInput
  }

  export type PortfolioUpdateOneRequiredWithoutPortfolioToArtPictureNestedInput = {
    create?: XOR<PortfolioCreateWithoutPortfolioToArtPictureInput, PortfolioUncheckedCreateWithoutPortfolioToArtPictureInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutPortfolioToArtPictureInput
    upsert?: PortfolioUpsertWithoutPortfolioToArtPictureInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutPortfolioToArtPictureInput, PortfolioUpdateWithoutPortfolioToArtPictureInput>, PortfolioUncheckedUpdateWithoutPortfolioToArtPictureInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type Student_packageCreateNestedManyWithoutCourseInput = {
    create?: XOR<Student_packageCreateWithoutCourseInput, Student_packageUncheckedCreateWithoutCourseInput> | Student_packageCreateWithoutCourseInput[] | Student_packageUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: Student_packageCreateOrConnectWithoutCourseInput | Student_packageCreateOrConnectWithoutCourseInput[]
    createMany?: Student_packageCreateManyCourseInputEnvelope
    connect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
  }

  export type Student_packageUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<Student_packageCreateWithoutCourseInput, Student_packageUncheckedCreateWithoutCourseInput> | Student_packageCreateWithoutCourseInput[] | Student_packageUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: Student_packageCreateOrConnectWithoutCourseInput | Student_packageCreateOrConnectWithoutCourseInput[]
    createMany?: Student_packageCreateManyCourseInputEnvelope
    connect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
  }

  export type Student_packageUpdateManyWithoutCourseNestedInput = {
    create?: XOR<Student_packageCreateWithoutCourseInput, Student_packageUncheckedCreateWithoutCourseInput> | Student_packageCreateWithoutCourseInput[] | Student_packageUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: Student_packageCreateOrConnectWithoutCourseInput | Student_packageCreateOrConnectWithoutCourseInput[]
    upsert?: Student_packageUpsertWithWhereUniqueWithoutCourseInput | Student_packageUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: Student_packageCreateManyCourseInputEnvelope
    set?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    disconnect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    delete?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    connect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    update?: Student_packageUpdateWithWhereUniqueWithoutCourseInput | Student_packageUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: Student_packageUpdateManyWithWhereWithoutCourseInput | Student_packageUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: Student_packageScalarWhereInput | Student_packageScalarWhereInput[]
  }

  export type Student_packageUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<Student_packageCreateWithoutCourseInput, Student_packageUncheckedCreateWithoutCourseInput> | Student_packageCreateWithoutCourseInput[] | Student_packageUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: Student_packageCreateOrConnectWithoutCourseInput | Student_packageCreateOrConnectWithoutCourseInput[]
    upsert?: Student_packageUpsertWithWhereUniqueWithoutCourseInput | Student_packageUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: Student_packageCreateManyCourseInputEnvelope
    set?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    disconnect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    delete?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    connect?: Student_packageWhereUniqueInput | Student_packageWhereUniqueInput[]
    update?: Student_packageUpdateWithWhereUniqueWithoutCourseInput | Student_packageUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: Student_packageUpdateManyWithWhereWithoutCourseInput | Student_packageUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: Student_packageScalarWhereInput | Student_packageScalarWhereInput[]
  }

  export type Class_groupCreateNestedOneWithoutGroupOfClassesInput = {
    create?: XOR<Class_groupCreateWithoutGroupOfClassesInput, Class_groupUncheckedCreateWithoutGroupOfClassesInput>
    connectOrCreate?: Class_groupCreateOrConnectWithoutGroupOfClassesInput
    connect?: Class_groupWhereUniqueInput
  }

  export type Student_packageCreateNestedOneWithoutClassInput = {
    create?: XOR<Student_packageCreateWithoutClassInput, Student_packageUncheckedCreateWithoutClassInput>
    connectOrCreate?: Student_packageCreateOrConnectWithoutClassInput
    connect?: Student_packageWhereUniqueInput
  }

  export type EnumClass_statusFieldUpdateOperationsInput = {
    set?: $Enums.Class_status
  }

  export type Class_groupUpdateOneWithoutGroupOfClassesNestedInput = {
    create?: XOR<Class_groupCreateWithoutGroupOfClassesInput, Class_groupUncheckedCreateWithoutGroupOfClassesInput>
    connectOrCreate?: Class_groupCreateOrConnectWithoutGroupOfClassesInput
    upsert?: Class_groupUpsertWithoutGroupOfClassesInput
    disconnect?: Class_groupWhereInput | boolean
    delete?: Class_groupWhereInput | boolean
    connect?: Class_groupWhereUniqueInput
    update?: XOR<XOR<Class_groupUpdateToOneWithWhereWithoutGroupOfClassesInput, Class_groupUpdateWithoutGroupOfClassesInput>, Class_groupUncheckedUpdateWithoutGroupOfClassesInput>
  }

  export type Student_packageUpdateOneRequiredWithoutClassNestedInput = {
    create?: XOR<Student_packageCreateWithoutClassInput, Student_packageUncheckedCreateWithoutClassInput>
    connectOrCreate?: Student_packageCreateOrConnectWithoutClassInput
    upsert?: Student_packageUpsertWithoutClassInput
    connect?: Student_packageWhereUniqueInput
    update?: XOR<XOR<Student_packageUpdateToOneWithWhereWithoutClassInput, Student_packageUpdateWithoutClassInput>, Student_packageUncheckedUpdateWithoutClassInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClassCreateNestedManyWithoutStudent_packageInput = {
    create?: XOR<ClassCreateWithoutStudent_packageInput, ClassUncheckedCreateWithoutStudent_packageInput> | ClassCreateWithoutStudent_packageInput[] | ClassUncheckedCreateWithoutStudent_packageInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutStudent_packageInput | ClassCreateOrConnectWithoutStudent_packageInput[]
    createMany?: ClassCreateManyStudent_packageInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type CourseCreateNestedOneWithoutStudent_packageInput = {
    create?: XOR<CourseCreateWithoutStudent_packageInput, CourseUncheckedCreateWithoutStudent_packageInput>
    connectOrCreate?: CourseCreateOrConnectWithoutStudent_packageInput
    connect?: CourseWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutStudent_packageInput = {
    create?: XOR<StudentCreateWithoutStudent_packageInput, StudentUncheckedCreateWithoutStudent_packageInput>
    connectOrCreate?: StudentCreateOrConnectWithoutStudent_packageInput
    connect?: StudentWhereUniqueInput
  }

  export type ClassUncheckedCreateNestedManyWithoutStudent_packageInput = {
    create?: XOR<ClassCreateWithoutStudent_packageInput, ClassUncheckedCreateWithoutStudent_packageInput> | ClassCreateWithoutStudent_packageInput[] | ClassUncheckedCreateWithoutStudent_packageInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutStudent_packageInput | ClassCreateOrConnectWithoutStudent_packageInput[]
    createMany?: ClassCreateManyStudent_packageInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumClassroomFieldUpdateOperationsInput = {
    set?: $Enums.Classroom
  }

  export type ClassUpdateManyWithoutStudent_packageNestedInput = {
    create?: XOR<ClassCreateWithoutStudent_packageInput, ClassUncheckedCreateWithoutStudent_packageInput> | ClassCreateWithoutStudent_packageInput[] | ClassUncheckedCreateWithoutStudent_packageInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutStudent_packageInput | ClassCreateOrConnectWithoutStudent_packageInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutStudent_packageInput | ClassUpsertWithWhereUniqueWithoutStudent_packageInput[]
    createMany?: ClassCreateManyStudent_packageInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutStudent_packageInput | ClassUpdateWithWhereUniqueWithoutStudent_packageInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutStudent_packageInput | ClassUpdateManyWithWhereWithoutStudent_packageInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type CourseUpdateOneRequiredWithoutStudent_packageNestedInput = {
    create?: XOR<CourseCreateWithoutStudent_packageInput, CourseUncheckedCreateWithoutStudent_packageInput>
    connectOrCreate?: CourseCreateOrConnectWithoutStudent_packageInput
    upsert?: CourseUpsertWithoutStudent_packageInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutStudent_packageInput, CourseUpdateWithoutStudent_packageInput>, CourseUncheckedUpdateWithoutStudent_packageInput>
  }

  export type StudentUpdateOneRequiredWithoutStudent_packageNestedInput = {
    create?: XOR<StudentCreateWithoutStudent_packageInput, StudentUncheckedCreateWithoutStudent_packageInput>
    connectOrCreate?: StudentCreateOrConnectWithoutStudent_packageInput
    upsert?: StudentUpsertWithoutStudent_packageInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutStudent_packageInput, StudentUpdateWithoutStudent_packageInput>, StudentUncheckedUpdateWithoutStudent_packageInput>
  }

  export type ClassUncheckedUpdateManyWithoutStudent_packageNestedInput = {
    create?: XOR<ClassCreateWithoutStudent_packageInput, ClassUncheckedCreateWithoutStudent_packageInput> | ClassCreateWithoutStudent_packageInput[] | ClassUncheckedCreateWithoutStudent_packageInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutStudent_packageInput | ClassCreateOrConnectWithoutStudent_packageInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutStudent_packageInput | ClassUpsertWithWhereUniqueWithoutStudent_packageInput[]
    createMany?: ClassCreateManyStudent_packageInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutStudent_packageInput | ClassUpdateWithWhereUniqueWithoutStudent_packageInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutStudent_packageInput | ClassUpdateManyWithWhereWithoutStudent_packageInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type ClassCreateNestedManyWithoutClass_group_of_ClassesInput = {
    create?: XOR<ClassCreateWithoutClass_group_of_ClassesInput, ClassUncheckedCreateWithoutClass_group_of_ClassesInput> | ClassCreateWithoutClass_group_of_ClassesInput[] | ClassUncheckedCreateWithoutClass_group_of_ClassesInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutClass_group_of_ClassesInput | ClassCreateOrConnectWithoutClass_group_of_ClassesInput[]
    createMany?: ClassCreateManyClass_group_of_ClassesInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type ClassUncheckedCreateNestedManyWithoutClass_group_of_ClassesInput = {
    create?: XOR<ClassCreateWithoutClass_group_of_ClassesInput, ClassUncheckedCreateWithoutClass_group_of_ClassesInput> | ClassCreateWithoutClass_group_of_ClassesInput[] | ClassUncheckedCreateWithoutClass_group_of_ClassesInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutClass_group_of_ClassesInput | ClassCreateOrConnectWithoutClass_group_of_ClassesInput[]
    createMany?: ClassCreateManyClass_group_of_ClassesInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type ClassUpdateManyWithoutClass_group_of_ClassesNestedInput = {
    create?: XOR<ClassCreateWithoutClass_group_of_ClassesInput, ClassUncheckedCreateWithoutClass_group_of_ClassesInput> | ClassCreateWithoutClass_group_of_ClassesInput[] | ClassUncheckedCreateWithoutClass_group_of_ClassesInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutClass_group_of_ClassesInput | ClassCreateOrConnectWithoutClass_group_of_ClassesInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutClass_group_of_ClassesInput | ClassUpsertWithWhereUniqueWithoutClass_group_of_ClassesInput[]
    createMany?: ClassCreateManyClass_group_of_ClassesInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutClass_group_of_ClassesInput | ClassUpdateWithWhereUniqueWithoutClass_group_of_ClassesInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutClass_group_of_ClassesInput | ClassUpdateManyWithWhereWithoutClass_group_of_ClassesInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type ClassUncheckedUpdateManyWithoutClass_group_of_ClassesNestedInput = {
    create?: XOR<ClassCreateWithoutClass_group_of_ClassesInput, ClassUncheckedCreateWithoutClass_group_of_ClassesInput> | ClassCreateWithoutClass_group_of_ClassesInput[] | ClassUncheckedCreateWithoutClass_group_of_ClassesInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutClass_group_of_ClassesInput | ClassCreateOrConnectWithoutClass_group_of_ClassesInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutClass_group_of_ClassesInput | ClassUpsertWithWhereUniqueWithoutClass_group_of_ClassesInput[]
    createMany?: ClassCreateManyClass_group_of_ClassesInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutClass_group_of_ClassesInput | ClassUpdateWithWhereUniqueWithoutClass_group_of_ClassesInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutClass_group_of_ClassesInput | ClassUpdateManyWithWhereWithoutClass_group_of_ClassesInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumClass_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.Class_status | EnumClass_statusFieldRefInput<$PrismaModel>
    in?: $Enums.Class_status[] | ListEnumClass_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Class_status[] | ListEnumClass_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumClass_statusFilter<$PrismaModel> | $Enums.Class_status
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumClass_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Class_status | EnumClass_statusFieldRefInput<$PrismaModel>
    in?: $Enums.Class_status[] | ListEnumClass_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Class_status[] | ListEnumClass_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumClass_statusWithAggregatesFilter<$PrismaModel> | $Enums.Class_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClass_statusFilter<$PrismaModel>
    _max?: NestedEnumClass_statusFilter<$PrismaModel>
  }

  export type NestedEnumClassroomFilter<$PrismaModel = never> = {
    equals?: $Enums.Classroom | EnumClassroomFieldRefInput<$PrismaModel>
    in?: $Enums.Classroom[] | ListEnumClassroomFieldRefInput<$PrismaModel>
    notIn?: $Enums.Classroom[] | ListEnumClassroomFieldRefInput<$PrismaModel>
    not?: NestedEnumClassroomFilter<$PrismaModel> | $Enums.Classroom
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumClassroomWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Classroom | EnumClassroomFieldRefInput<$PrismaModel>
    in?: $Enums.Classroom[] | ListEnumClassroomFieldRefInput<$PrismaModel>
    notIn?: $Enums.Classroom[] | ListEnumClassroomFieldRefInput<$PrismaModel>
    not?: NestedEnumClassroomWithAggregatesFilter<$PrismaModel> | $Enums.Classroom
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClassroomFilter<$PrismaModel>
    _max?: NestedEnumClassroomFilter<$PrismaModel>
  }

  export type PortfolioCreateWithoutStudentInput = {
    id?: string
    name: string
    created_at?: number
    created_at_hk?: string
    PortfolioToArtPicture?: Portfolio_to_art_photoCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutStudentInput = {
    id?: string
    name: string
    created_at?: number
    created_at_hk?: string
    PortfolioToArtPicture?: Portfolio_to_art_photoUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutStudentInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutStudentInput, PortfolioUncheckedCreateWithoutStudentInput>
  }

  export type PortfolioCreateManyStudentInputEnvelope = {
    data: PortfolioCreateManyStudentInput | PortfolioCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type Student_packageCreateWithoutStudentInput = {
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
    Class?: ClassCreateNestedManyWithoutStudent_packageInput
    Course: CourseCreateNestedOneWithoutStudent_packageInput
  }

  export type Student_packageUncheckedCreateWithoutStudentInput = {
    id?: number
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    course_id: number
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
    Class?: ClassUncheckedCreateNestedManyWithoutStudent_packageInput
  }

  export type Student_packageCreateOrConnectWithoutStudentInput = {
    where: Student_packageWhereUniqueInput
    create: XOR<Student_packageCreateWithoutStudentInput, Student_packageUncheckedCreateWithoutStudentInput>
  }

  export type Student_packageCreateManyStudentInputEnvelope = {
    data: Student_packageCreateManyStudentInput | Student_packageCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type PortfolioUpsertWithWhereUniqueWithoutStudentInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutStudentInput, PortfolioUncheckedUpdateWithoutStudentInput>
    create: XOR<PortfolioCreateWithoutStudentInput, PortfolioUncheckedCreateWithoutStudentInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutStudentInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutStudentInput, PortfolioUncheckedUpdateWithoutStudentInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutStudentInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutStudentInput>
  }

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    OR?: PortfolioScalarWhereInput[]
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    id?: UuidFilter<"Portfolio"> | string
    student_id?: UuidFilter<"Portfolio"> | string
    name?: StringFilter<"Portfolio"> | string
    created_at?: FloatFilter<"Portfolio"> | number
    created_at_hk?: StringFilter<"Portfolio"> | string
  }

  export type Student_packageUpsertWithWhereUniqueWithoutStudentInput = {
    where: Student_packageWhereUniqueInput
    update: XOR<Student_packageUpdateWithoutStudentInput, Student_packageUncheckedUpdateWithoutStudentInput>
    create: XOR<Student_packageCreateWithoutStudentInput, Student_packageUncheckedCreateWithoutStudentInput>
  }

  export type Student_packageUpdateWithWhereUniqueWithoutStudentInput = {
    where: Student_packageWhereUniqueInput
    data: XOR<Student_packageUpdateWithoutStudentInput, Student_packageUncheckedUpdateWithoutStudentInput>
  }

  export type Student_packageUpdateManyWithWhereWithoutStudentInput = {
    where: Student_packageScalarWhereInput
    data: XOR<Student_packageUpdateManyMutationInput, Student_packageUncheckedUpdateManyWithoutStudentInput>
  }

  export type Student_packageScalarWhereInput = {
    AND?: Student_packageScalarWhereInput | Student_packageScalarWhereInput[]
    OR?: Student_packageScalarWhereInput[]
    NOT?: Student_packageScalarWhereInput | Student_packageScalarWhereInput[]
    id?: IntFilter<"Student_package"> | number
    start_date?: FloatFilter<"Student_package"> | number
    paid_at?: FloatNullableFilter<"Student_package"> | number | null
    official_end_date?: FloatNullableFilter<"Student_package"> | number | null
    expiry_date?: FloatFilter<"Student_package"> | number
    min?: IntFilter<"Student_package"> | number
    course_id?: IntFilter<"Student_package"> | number
    student_id?: UuidFilter<"Student_package"> | string
    created_at?: FloatFilter<"Student_package"> | number
    created_at_hk?: StringFilter<"Student_package"> | string
    num_of_classes?: IntFilter<"Student_package"> | number
    default_classroom?: EnumClassroomFilter<"Student_package"> | $Enums.Classroom
  }

  export type StudentCreateWithoutPortfolioInput = {
    id?: string
    first_name: string
    last_name: string
    chinese_name?: string | null
    gender: $Enums.Gender
    school_name: string
    grade: string
    phone_number?: string | null
    wechat_id?: string | null
    birthdate: number
    parent_email: string
    created_at?: number
    created_at_hk?: string
    Student_package?: Student_packageCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPortfolioInput = {
    id?: string
    first_name: string
    last_name: string
    chinese_name?: string | null
    gender: $Enums.Gender
    school_name: string
    grade: string
    phone_number?: string | null
    wechat_id?: string | null
    birthdate: number
    parent_email: string
    created_at?: number
    created_at_hk?: string
    Student_package?: Student_packageUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPortfolioInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPortfolioInput, StudentUncheckedCreateWithoutPortfolioInput>
  }

  export type Portfolio_to_art_photoCreateWithoutPortfolioInput = {
    photo_url: string
    photo_desc: string
  }

  export type Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput = {
    id?: number
    photo_url: string
    photo_desc: string
  }

  export type Portfolio_to_art_photoCreateOrConnectWithoutPortfolioInput = {
    where: Portfolio_to_art_photoWhereUniqueInput
    create: XOR<Portfolio_to_art_photoCreateWithoutPortfolioInput, Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput>
  }

  export type Portfolio_to_art_photoCreateManyPortfolioInputEnvelope = {
    data: Portfolio_to_art_photoCreateManyPortfolioInput | Portfolio_to_art_photoCreateManyPortfolioInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithoutPortfolioInput = {
    update: XOR<StudentUpdateWithoutPortfolioInput, StudentUncheckedUpdateWithoutPortfolioInput>
    create: XOR<StudentCreateWithoutPortfolioInput, StudentUncheckedCreateWithoutPortfolioInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutPortfolioInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutPortfolioInput, StudentUncheckedUpdateWithoutPortfolioInput>
  }

  export type StudentUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    chinese_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    school_name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    wechat_id?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: FloatFieldUpdateOperationsInput | number
    parent_email?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    Student_package?: Student_packageUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    chinese_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    school_name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    wechat_id?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: FloatFieldUpdateOperationsInput | number
    parent_email?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    Student_package?: Student_packageUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type Portfolio_to_art_photoUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: Portfolio_to_art_photoWhereUniqueInput
    update: XOR<Portfolio_to_art_photoUpdateWithoutPortfolioInput, Portfolio_to_art_photoUncheckedUpdateWithoutPortfolioInput>
    create: XOR<Portfolio_to_art_photoCreateWithoutPortfolioInput, Portfolio_to_art_photoUncheckedCreateWithoutPortfolioInput>
  }

  export type Portfolio_to_art_photoUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: Portfolio_to_art_photoWhereUniqueInput
    data: XOR<Portfolio_to_art_photoUpdateWithoutPortfolioInput, Portfolio_to_art_photoUncheckedUpdateWithoutPortfolioInput>
  }

  export type Portfolio_to_art_photoUpdateManyWithWhereWithoutPortfolioInput = {
    where: Portfolio_to_art_photoScalarWhereInput
    data: XOR<Portfolio_to_art_photoUpdateManyMutationInput, Portfolio_to_art_photoUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type Portfolio_to_art_photoScalarWhereInput = {
    AND?: Portfolio_to_art_photoScalarWhereInput | Portfolio_to_art_photoScalarWhereInput[]
    OR?: Portfolio_to_art_photoScalarWhereInput[]
    NOT?: Portfolio_to_art_photoScalarWhereInput | Portfolio_to_art_photoScalarWhereInput[]
    id?: IntFilter<"Portfolio_to_art_photo"> | number
    portfolio_id?: UuidFilter<"Portfolio_to_art_photo"> | string
    photo_url?: StringFilter<"Portfolio_to_art_photo"> | string
    photo_desc?: StringFilter<"Portfolio_to_art_photo"> | string
  }

  export type PortfolioCreateWithoutPortfolioToArtPictureInput = {
    id?: string
    name: string
    created_at?: number
    created_at_hk?: string
    Student: StudentCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutPortfolioToArtPictureInput = {
    id?: string
    student_id: string
    name: string
    created_at?: number
    created_at_hk?: string
  }

  export type PortfolioCreateOrConnectWithoutPortfolioToArtPictureInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutPortfolioToArtPictureInput, PortfolioUncheckedCreateWithoutPortfolioToArtPictureInput>
  }

  export type PortfolioUpsertWithoutPortfolioToArtPictureInput = {
    update: XOR<PortfolioUpdateWithoutPortfolioToArtPictureInput, PortfolioUncheckedUpdateWithoutPortfolioToArtPictureInput>
    create: XOR<PortfolioCreateWithoutPortfolioToArtPictureInput, PortfolioUncheckedCreateWithoutPortfolioToArtPictureInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutPortfolioToArtPictureInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutPortfolioToArtPictureInput, PortfolioUncheckedUpdateWithoutPortfolioToArtPictureInput>
  }

  export type PortfolioUpdateWithoutPortfolioToArtPictureInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    Student?: StudentUpdateOneRequiredWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutPortfolioToArtPictureInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type Student_packageCreateWithoutCourseInput = {
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
    Class?: ClassCreateNestedManyWithoutStudent_packageInput
    Student: StudentCreateNestedOneWithoutStudent_packageInput
  }

  export type Student_packageUncheckedCreateWithoutCourseInput = {
    id?: number
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    student_id: string
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
    Class?: ClassUncheckedCreateNestedManyWithoutStudent_packageInput
  }

  export type Student_packageCreateOrConnectWithoutCourseInput = {
    where: Student_packageWhereUniqueInput
    create: XOR<Student_packageCreateWithoutCourseInput, Student_packageUncheckedCreateWithoutCourseInput>
  }

  export type Student_packageCreateManyCourseInputEnvelope = {
    data: Student_packageCreateManyCourseInput | Student_packageCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type Student_packageUpsertWithWhereUniqueWithoutCourseInput = {
    where: Student_packageWhereUniqueInput
    update: XOR<Student_packageUpdateWithoutCourseInput, Student_packageUncheckedUpdateWithoutCourseInput>
    create: XOR<Student_packageCreateWithoutCourseInput, Student_packageUncheckedCreateWithoutCourseInput>
  }

  export type Student_packageUpdateWithWhereUniqueWithoutCourseInput = {
    where: Student_packageWhereUniqueInput
    data: XOR<Student_packageUpdateWithoutCourseInput, Student_packageUncheckedUpdateWithoutCourseInput>
  }

  export type Student_packageUpdateManyWithWhereWithoutCourseInput = {
    where: Student_packageScalarWhereInput
    data: XOR<Student_packageUpdateManyMutationInput, Student_packageUncheckedUpdateManyWithoutCourseInput>
  }

  export type Class_groupCreateWithoutGroupOfClassesInput = {

  }

  export type Class_groupUncheckedCreateWithoutGroupOfClassesInput = {
    id?: number
  }

  export type Class_groupCreateOrConnectWithoutGroupOfClassesInput = {
    where: Class_groupWhereUniqueInput
    create: XOR<Class_groupCreateWithoutGroupOfClassesInput, Class_groupUncheckedCreateWithoutGroupOfClassesInput>
  }

  export type Student_packageCreateWithoutClassInput = {
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
    Course: CourseCreateNestedOneWithoutStudent_packageInput
    Student: StudentCreateNestedOneWithoutStudent_packageInput
  }

  export type Student_packageUncheckedCreateWithoutClassInput = {
    id?: number
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    course_id: number
    student_id: string
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
  }

  export type Student_packageCreateOrConnectWithoutClassInput = {
    where: Student_packageWhereUniqueInput
    create: XOR<Student_packageCreateWithoutClassInput, Student_packageUncheckedCreateWithoutClassInput>
  }

  export type Class_groupUpsertWithoutGroupOfClassesInput = {
    update: XOR<Class_groupUpdateWithoutGroupOfClassesInput, Class_groupUncheckedUpdateWithoutGroupOfClassesInput>
    create: XOR<Class_groupCreateWithoutGroupOfClassesInput, Class_groupUncheckedCreateWithoutGroupOfClassesInput>
    where?: Class_groupWhereInput
  }

  export type Class_groupUpdateToOneWithWhereWithoutGroupOfClassesInput = {
    where?: Class_groupWhereInput
    data: XOR<Class_groupUpdateWithoutGroupOfClassesInput, Class_groupUncheckedUpdateWithoutGroupOfClassesInput>
  }

  export type Class_groupUpdateWithoutGroupOfClassesInput = {

  }

  export type Class_groupUncheckedUpdateWithoutGroupOfClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type Student_packageUpsertWithoutClassInput = {
    update: XOR<Student_packageUpdateWithoutClassInput, Student_packageUncheckedUpdateWithoutClassInput>
    create: XOR<Student_packageCreateWithoutClassInput, Student_packageUncheckedCreateWithoutClassInput>
    where?: Student_packageWhereInput
  }

  export type Student_packageUpdateToOneWithWhereWithoutClassInput = {
    where?: Student_packageWhereInput
    data: XOR<Student_packageUpdateWithoutClassInput, Student_packageUncheckedUpdateWithoutClassInput>
  }

  export type Student_packageUpdateWithoutClassInput = {
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
    Course?: CourseUpdateOneRequiredWithoutStudent_packageNestedInput
    Student?: StudentUpdateOneRequiredWithoutStudent_packageNestedInput
  }

  export type Student_packageUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    course_id?: IntFieldUpdateOperationsInput | number
    student_id?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
  }

  export type ClassCreateWithoutStudent_packageInput = {
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    remark?: string | null
    Class_group_of_Classes?: Class_groupCreateNestedOneWithoutGroupOfClassesInput
  }

  export type ClassUncheckedCreateWithoutStudent_packageInput = {
    id?: number
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    class_group_id?: number | null
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    remark?: string | null
  }

  export type ClassCreateOrConnectWithoutStudent_packageInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutStudent_packageInput, ClassUncheckedCreateWithoutStudent_packageInput>
  }

  export type ClassCreateManyStudent_packageInputEnvelope = {
    data: ClassCreateManyStudent_packageInput | ClassCreateManyStudent_packageInput[]
    skipDuplicates?: boolean
  }

  export type CourseCreateWithoutStudent_packageInput = {
    created_at?: number
    created_at_hk?: string
    course_name: string
  }

  export type CourseUncheckedCreateWithoutStudent_packageInput = {
    id?: number
    created_at?: number
    created_at_hk?: string
    course_name: string
  }

  export type CourseCreateOrConnectWithoutStudent_packageInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutStudent_packageInput, CourseUncheckedCreateWithoutStudent_packageInput>
  }

  export type StudentCreateWithoutStudent_packageInput = {
    id?: string
    first_name: string
    last_name: string
    chinese_name?: string | null
    gender: $Enums.Gender
    school_name: string
    grade: string
    phone_number?: string | null
    wechat_id?: string | null
    birthdate: number
    parent_email: string
    created_at?: number
    created_at_hk?: string
    Portfolio?: PortfolioCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutStudent_packageInput = {
    id?: string
    first_name: string
    last_name: string
    chinese_name?: string | null
    gender: $Enums.Gender
    school_name: string
    grade: string
    phone_number?: string | null
    wechat_id?: string | null
    birthdate: number
    parent_email: string
    created_at?: number
    created_at_hk?: string
    Portfolio?: PortfolioUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutStudent_packageInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutStudent_packageInput, StudentUncheckedCreateWithoutStudent_packageInput>
  }

  export type ClassUpsertWithWhereUniqueWithoutStudent_packageInput = {
    where: ClassWhereUniqueInput
    update: XOR<ClassUpdateWithoutStudent_packageInput, ClassUncheckedUpdateWithoutStudent_packageInput>
    create: XOR<ClassCreateWithoutStudent_packageInput, ClassUncheckedCreateWithoutStudent_packageInput>
  }

  export type ClassUpdateWithWhereUniqueWithoutStudent_packageInput = {
    where: ClassWhereUniqueInput
    data: XOR<ClassUpdateWithoutStudent_packageInput, ClassUncheckedUpdateWithoutStudent_packageInput>
  }

  export type ClassUpdateManyWithWhereWithoutStudent_packageInput = {
    where: ClassScalarWhereInput
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyWithoutStudent_packageInput>
  }

  export type ClassScalarWhereInput = {
    AND?: ClassScalarWhereInput | ClassScalarWhereInput[]
    OR?: ClassScalarWhereInput[]
    NOT?: ClassScalarWhereInput | ClassScalarWhereInput[]
    id?: IntFilter<"Class"> | number
    day_unix_timestamp?: FloatFilter<"Class"> | number
    hour_unix_timestamp?: FloatFilter<"Class"> | number
    min?: IntFilter<"Class"> | number
    created_at?: FloatFilter<"Class"> | number
    created_at_hk?: StringFilter<"Class"> | string
    class_group_id?: IntNullableFilter<"Class"> | number | null
    actual_classroom?: StringNullableFilter<"Class"> | string | null
    reason_for_absence?: StringNullableFilter<"Class"> | string | null
    class_status?: EnumClass_statusFilter<"Class"> | $Enums.Class_status
    student_package_id?: IntFilter<"Class"> | number
    remark?: StringNullableFilter<"Class"> | string | null
  }

  export type CourseUpsertWithoutStudent_packageInput = {
    update: XOR<CourseUpdateWithoutStudent_packageInput, CourseUncheckedUpdateWithoutStudent_packageInput>
    create: XOR<CourseCreateWithoutStudent_packageInput, CourseUncheckedCreateWithoutStudent_packageInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutStudent_packageInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutStudent_packageInput, CourseUncheckedUpdateWithoutStudent_packageInput>
  }

  export type CourseUpdateWithoutStudent_packageInput = {
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
  }

  export type CourseUncheckedUpdateWithoutStudent_packageInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
  }

  export type StudentUpsertWithoutStudent_packageInput = {
    update: XOR<StudentUpdateWithoutStudent_packageInput, StudentUncheckedUpdateWithoutStudent_packageInput>
    create: XOR<StudentCreateWithoutStudent_packageInput, StudentUncheckedCreateWithoutStudent_packageInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutStudent_packageInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutStudent_packageInput, StudentUncheckedUpdateWithoutStudent_packageInput>
  }

  export type StudentUpdateWithoutStudent_packageInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    chinese_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    school_name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    wechat_id?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: FloatFieldUpdateOperationsInput | number
    parent_email?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    Portfolio?: PortfolioUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutStudent_packageInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    chinese_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    school_name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    wechat_id?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: FloatFieldUpdateOperationsInput | number
    parent_email?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    Portfolio?: PortfolioUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ClassCreateWithoutClass_group_of_ClassesInput = {
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    remark?: string | null
    Student_package: Student_packageCreateNestedOneWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutClass_group_of_ClassesInput = {
    id?: number
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    student_package_id: number
    remark?: string | null
  }

  export type ClassCreateOrConnectWithoutClass_group_of_ClassesInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutClass_group_of_ClassesInput, ClassUncheckedCreateWithoutClass_group_of_ClassesInput>
  }

  export type ClassCreateManyClass_group_of_ClassesInputEnvelope = {
    data: ClassCreateManyClass_group_of_ClassesInput | ClassCreateManyClass_group_of_ClassesInput[]
    skipDuplicates?: boolean
  }

  export type ClassUpsertWithWhereUniqueWithoutClass_group_of_ClassesInput = {
    where: ClassWhereUniqueInput
    update: XOR<ClassUpdateWithoutClass_group_of_ClassesInput, ClassUncheckedUpdateWithoutClass_group_of_ClassesInput>
    create: XOR<ClassCreateWithoutClass_group_of_ClassesInput, ClassUncheckedCreateWithoutClass_group_of_ClassesInput>
  }

  export type ClassUpdateWithWhereUniqueWithoutClass_group_of_ClassesInput = {
    where: ClassWhereUniqueInput
    data: XOR<ClassUpdateWithoutClass_group_of_ClassesInput, ClassUncheckedUpdateWithoutClass_group_of_ClassesInput>
  }

  export type ClassUpdateManyWithWhereWithoutClass_group_of_ClassesInput = {
    where: ClassScalarWhereInput
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyWithoutClass_group_of_ClassesInput>
  }

  export type PortfolioCreateManyStudentInput = {
    id?: string
    name: string
    created_at?: number
    created_at_hk?: string
  }

  export type Student_packageCreateManyStudentInput = {
    id?: number
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    course_id: number
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
  }

  export type PortfolioUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    PortfolioToArtPicture?: Portfolio_to_art_photoUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    PortfolioToArtPicture?: Portfolio_to_art_photoUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
  }

  export type Student_packageUpdateWithoutStudentInput = {
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
    Class?: ClassUpdateManyWithoutStudent_packageNestedInput
    Course?: CourseUpdateOneRequiredWithoutStudent_packageNestedInput
  }

  export type Student_packageUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    course_id?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
    Class?: ClassUncheckedUpdateManyWithoutStudent_packageNestedInput
  }

  export type Student_packageUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    course_id?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
  }

  export type Portfolio_to_art_photoCreateManyPortfolioInput = {
    id?: number
    photo_url: string
    photo_desc: string
  }

  export type Portfolio_to_art_photoUpdateWithoutPortfolioInput = {
    photo_url?: StringFieldUpdateOperationsInput | string
    photo_desc?: StringFieldUpdateOperationsInput | string
  }

  export type Portfolio_to_art_photoUncheckedUpdateWithoutPortfolioInput = {
    id?: IntFieldUpdateOperationsInput | number
    photo_url?: StringFieldUpdateOperationsInput | string
    photo_desc?: StringFieldUpdateOperationsInput | string
  }

  export type Portfolio_to_art_photoUncheckedUpdateManyWithoutPortfolioInput = {
    id?: IntFieldUpdateOperationsInput | number
    photo_url?: StringFieldUpdateOperationsInput | string
    photo_desc?: StringFieldUpdateOperationsInput | string
  }

  export type Student_packageCreateManyCourseInput = {
    id?: number
    start_date: number
    paid_at?: number | null
    official_end_date?: number | null
    expiry_date: number
    min: number
    student_id: string
    created_at?: number
    created_at_hk?: string
    num_of_classes: number
    default_classroom: $Enums.Classroom
  }

  export type Student_packageUpdateWithoutCourseInput = {
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
    Class?: ClassUpdateManyWithoutStudent_packageNestedInput
    Student?: StudentUpdateOneRequiredWithoutStudent_packageNestedInput
  }

  export type Student_packageUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    student_id?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
    Class?: ClassUncheckedUpdateManyWithoutStudent_packageNestedInput
  }

  export type Student_packageUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    start_date?: FloatFieldUpdateOperationsInput | number
    paid_at?: NullableFloatFieldUpdateOperationsInput | number | null
    official_end_date?: NullableFloatFieldUpdateOperationsInput | number | null
    expiry_date?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    student_id?: StringFieldUpdateOperationsInput | string
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    num_of_classes?: IntFieldUpdateOperationsInput | number
    default_classroom?: EnumClassroomFieldUpdateOperationsInput | $Enums.Classroom
  }

  export type ClassCreateManyStudent_packageInput = {
    id?: number
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    class_group_id?: number | null
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    remark?: string | null
  }

  export type ClassUpdateWithoutStudent_packageInput = {
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    Class_group_of_Classes?: Class_groupUpdateOneWithoutGroupOfClassesNestedInput
  }

  export type ClassUncheckedUpdateWithoutStudent_packageInput = {
    id?: IntFieldUpdateOperationsInput | number
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    class_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    remark?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassUncheckedUpdateManyWithoutStudent_packageInput = {
    id?: IntFieldUpdateOperationsInput | number
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    class_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    remark?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassCreateManyClass_group_of_ClassesInput = {
    id?: number
    day_unix_timestamp: number
    hour_unix_timestamp: number
    min: number
    created_at?: number
    created_at_hk?: string
    actual_classroom?: string | null
    reason_for_absence?: string | null
    class_status?: $Enums.Class_status
    student_package_id: number
    remark?: string | null
  }

  export type ClassUpdateWithoutClass_group_of_ClassesInput = {
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    Student_package?: Student_packageUpdateOneRequiredWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutClass_group_of_ClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    student_package_id?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassUncheckedUpdateManyWithoutClass_group_of_ClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
    day_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    hour_unix_timestamp?: FloatFieldUpdateOperationsInput | number
    min?: IntFieldUpdateOperationsInput | number
    created_at?: FloatFieldUpdateOperationsInput | number
    created_at_hk?: StringFieldUpdateOperationsInput | string
    actual_classroom?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_absence?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: EnumClass_statusFieldUpdateOperationsInput | $Enums.Class_status
    student_package_id?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use StudentCountOutputTypeDefaultArgs instead
     */
    export type StudentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PortfolioCountOutputTypeDefaultArgs instead
     */
    export type PortfolioCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PortfolioCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CourseCountOutputTypeDefaultArgs instead
     */
    export type CourseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CourseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Student_packageCountOutputTypeDefaultArgs instead
     */
    export type Student_packageCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Student_packageCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Class_groupCountOutputTypeDefaultArgs instead
     */
    export type Class_groupCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Class_groupCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PortfolioDefaultArgs instead
     */
    export type PortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PortfolioDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Portfolio_to_art_photoDefaultArgs instead
     */
    export type Portfolio_to_art_photoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Portfolio_to_art_photoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Login_sessionDefaultArgs instead
     */
    export type Login_sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Login_sessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CourseDefaultArgs instead
     */
    export type CourseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CourseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassDefaultArgs instead
     */
    export type ClassArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Student_packageDefaultArgs instead
     */
    export type Student_packageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Student_packageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Class_groupDefaultArgs instead
     */
    export type Class_groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Class_groupDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}