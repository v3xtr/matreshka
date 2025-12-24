
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model FeedVideo
 * 
 */
export type FeedVideo = $Result.DefaultSelection<Prisma.$FeedVideoPayload>
/**
 * Model VideoLike
 * 
 */
export type VideoLike = $Result.DefaultSelection<Prisma.$VideoLikePayload>
/**
 * Model VideoComment
 * 
 */
export type VideoComment = $Result.DefaultSelection<Prisma.$VideoCommentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedVideo`: Exposes CRUD operations for the **FeedVideo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedVideos
    * const feedVideos = await prisma.feedVideo.findMany()
    * ```
    */
  get feedVideo(): Prisma.FeedVideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videoLike`: Exposes CRUD operations for the **VideoLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoLikes
    * const videoLikes = await prisma.videoLike.findMany()
    * ```
    */
  get videoLike(): Prisma.VideoLikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videoComment`: Exposes CRUD operations for the **VideoComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoComments
    * const videoComments = await prisma.videoComment.findMany()
    * ```
    */
  get videoComment(): Prisma.VideoCommentDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    FeedVideo: 'FeedVideo',
    VideoLike: 'VideoLike',
    VideoComment: 'VideoComment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "feedVideo" | "videoLike" | "videoComment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
      FeedVideo: {
        payload: Prisma.$FeedVideoPayload<ExtArgs>
        fields: Prisma.FeedVideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedVideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedVideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>
          }
          findFirst: {
            args: Prisma.FeedVideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedVideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>
          }
          findMany: {
            args: Prisma.FeedVideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>[]
          }
          create: {
            args: Prisma.FeedVideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>
          }
          createMany: {
            args: Prisma.FeedVideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedVideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>[]
          }
          delete: {
            args: Prisma.FeedVideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>
          }
          update: {
            args: Prisma.FeedVideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>
          }
          deleteMany: {
            args: Prisma.FeedVideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedVideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedVideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>[]
          }
          upsert: {
            args: Prisma.FeedVideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedVideoPayload>
          }
          aggregate: {
            args: Prisma.FeedVideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedVideo>
          }
          groupBy: {
            args: Prisma.FeedVideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedVideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedVideoCountArgs<ExtArgs>
            result: $Utils.Optional<FeedVideoCountAggregateOutputType> | number
          }
        }
      }
      VideoLike: {
        payload: Prisma.$VideoLikePayload<ExtArgs>
        fields: Prisma.VideoLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>
          }
          findFirst: {
            args: Prisma.VideoLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>
          }
          findMany: {
            args: Prisma.VideoLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>[]
          }
          create: {
            args: Prisma.VideoLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>
          }
          createMany: {
            args: Prisma.VideoLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>[]
          }
          delete: {
            args: Prisma.VideoLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>
          }
          update: {
            args: Prisma.VideoLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>
          }
          deleteMany: {
            args: Prisma.VideoLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>[]
          }
          upsert: {
            args: Prisma.VideoLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoLikePayload>
          }
          aggregate: {
            args: Prisma.VideoLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoLike>
          }
          groupBy: {
            args: Prisma.VideoLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoLikeCountArgs<ExtArgs>
            result: $Utils.Optional<VideoLikeCountAggregateOutputType> | number
          }
        }
      }
      VideoComment: {
        payload: Prisma.$VideoCommentPayload<ExtArgs>
        fields: Prisma.VideoCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>
          }
          findFirst: {
            args: Prisma.VideoCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>
          }
          findMany: {
            args: Prisma.VideoCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>[]
          }
          create: {
            args: Prisma.VideoCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>
          }
          createMany: {
            args: Prisma.VideoCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>[]
          }
          delete: {
            args: Prisma.VideoCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>
          }
          update: {
            args: Prisma.VideoCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>
          }
          deleteMany: {
            args: Prisma.VideoCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>[]
          }
          upsert: {
            args: Prisma.VideoCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoCommentPayload>
          }
          aggregate: {
            args: Prisma.VideoCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoComment>
          }
          groupBy: {
            args: Prisma.VideoCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoCommentCountArgs<ExtArgs>
            result: $Utils.Optional<VideoCommentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    feedVideo?: FeedVideoOmit
    videoLike?: VideoLikeOmit
    videoComment?: VideoCommentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    phone: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    phone: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    phone: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    phone?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    phone?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    phone?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    phone: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
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
    email?: boolean
    password?: boolean
    phone?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "phone" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      phone: string
      name: string
      description: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly description: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model FeedVideo
   */

  export type AggregateFeedVideo = {
    _count: FeedVideoCountAggregateOutputType | null
    _avg: FeedVideoAvgAggregateOutputType | null
    _sum: FeedVideoSumAggregateOutputType | null
    _min: FeedVideoMinAggregateOutputType | null
    _max: FeedVideoMaxAggregateOutputType | null
  }

  export type FeedVideoAvgAggregateOutputType = {
    likesCount: number | null
    commentsCount: number | null
  }

  export type FeedVideoSumAggregateOutputType = {
    likesCount: number | null
    commentsCount: number | null
  }

  export type FeedVideoMinAggregateOutputType = {
    id: string | null
    userId: string | null
    description: string | null
    likesCount: number | null
    commentsCount: number | null
    createdAt: Date | null
  }

  export type FeedVideoMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    description: string | null
    likesCount: number | null
    commentsCount: number | null
    createdAt: Date | null
  }

  export type FeedVideoCountAggregateOutputType = {
    id: number
    userId: number
    description: number
    likesCount: number
    commentsCount: number
    createdAt: number
    _all: number
  }


  export type FeedVideoAvgAggregateInputType = {
    likesCount?: true
    commentsCount?: true
  }

  export type FeedVideoSumAggregateInputType = {
    likesCount?: true
    commentsCount?: true
  }

  export type FeedVideoMinAggregateInputType = {
    id?: true
    userId?: true
    description?: true
    likesCount?: true
    commentsCount?: true
    createdAt?: true
  }

  export type FeedVideoMaxAggregateInputType = {
    id?: true
    userId?: true
    description?: true
    likesCount?: true
    commentsCount?: true
    createdAt?: true
  }

  export type FeedVideoCountAggregateInputType = {
    id?: true
    userId?: true
    description?: true
    likesCount?: true
    commentsCount?: true
    createdAt?: true
    _all?: true
  }

  export type FeedVideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedVideo to aggregate.
     */
    where?: FeedVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedVideos to fetch.
     */
    orderBy?: FeedVideoOrderByWithRelationInput | FeedVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedVideos
    **/
    _count?: true | FeedVideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedVideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedVideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedVideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedVideoMaxAggregateInputType
  }

  export type GetFeedVideoAggregateType<T extends FeedVideoAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedVideo[P]>
      : GetScalarType<T[P], AggregateFeedVideo[P]>
  }




  export type FeedVideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedVideoWhereInput
    orderBy?: FeedVideoOrderByWithAggregationInput | FeedVideoOrderByWithAggregationInput[]
    by: FeedVideoScalarFieldEnum[] | FeedVideoScalarFieldEnum
    having?: FeedVideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedVideoCountAggregateInputType | true
    _avg?: FeedVideoAvgAggregateInputType
    _sum?: FeedVideoSumAggregateInputType
    _min?: FeedVideoMinAggregateInputType
    _max?: FeedVideoMaxAggregateInputType
  }

  export type FeedVideoGroupByOutputType = {
    id: string
    userId: string
    description: string
    likesCount: number
    commentsCount: number
    createdAt: Date
    _count: FeedVideoCountAggregateOutputType | null
    _avg: FeedVideoAvgAggregateOutputType | null
    _sum: FeedVideoSumAggregateOutputType | null
    _min: FeedVideoMinAggregateOutputType | null
    _max: FeedVideoMaxAggregateOutputType | null
  }

  type GetFeedVideoGroupByPayload<T extends FeedVideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedVideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedVideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedVideoGroupByOutputType[P]>
            : GetScalarType<T[P], FeedVideoGroupByOutputType[P]>
        }
      >
    >


  export type FeedVideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    description?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feedVideo"]>

  export type FeedVideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    description?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feedVideo"]>

  export type FeedVideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    description?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feedVideo"]>

  export type FeedVideoSelectScalar = {
    id?: boolean
    userId?: boolean
    description?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    createdAt?: boolean
  }

  export type FeedVideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "description" | "likesCount" | "commentsCount" | "createdAt", ExtArgs["result"]["feedVideo"]>

  export type $FeedVideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedVideo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      description: string
      likesCount: number
      commentsCount: number
      createdAt: Date
    }, ExtArgs["result"]["feedVideo"]>
    composites: {}
  }

  type FeedVideoGetPayload<S extends boolean | null | undefined | FeedVideoDefaultArgs> = $Result.GetResult<Prisma.$FeedVideoPayload, S>

  type FeedVideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedVideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedVideoCountAggregateInputType | true
    }

  export interface FeedVideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedVideo'], meta: { name: 'FeedVideo' } }
    /**
     * Find zero or one FeedVideo that matches the filter.
     * @param {FeedVideoFindUniqueArgs} args - Arguments to find a FeedVideo
     * @example
     * // Get one FeedVideo
     * const feedVideo = await prisma.feedVideo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedVideoFindUniqueArgs>(args: SelectSubset<T, FeedVideoFindUniqueArgs<ExtArgs>>): Prisma__FeedVideoClient<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeedVideo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedVideoFindUniqueOrThrowArgs} args - Arguments to find a FeedVideo
     * @example
     * // Get one FeedVideo
     * const feedVideo = await prisma.feedVideo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedVideoFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedVideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedVideoClient<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedVideo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedVideoFindFirstArgs} args - Arguments to find a FeedVideo
     * @example
     * // Get one FeedVideo
     * const feedVideo = await prisma.feedVideo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedVideoFindFirstArgs>(args?: SelectSubset<T, FeedVideoFindFirstArgs<ExtArgs>>): Prisma__FeedVideoClient<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedVideo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedVideoFindFirstOrThrowArgs} args - Arguments to find a FeedVideo
     * @example
     * // Get one FeedVideo
     * const feedVideo = await prisma.feedVideo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedVideoFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedVideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedVideoClient<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeedVideos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedVideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedVideos
     * const feedVideos = await prisma.feedVideo.findMany()
     * 
     * // Get first 10 FeedVideos
     * const feedVideos = await prisma.feedVideo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedVideoWithIdOnly = await prisma.feedVideo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedVideoFindManyArgs>(args?: SelectSubset<T, FeedVideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeedVideo.
     * @param {FeedVideoCreateArgs} args - Arguments to create a FeedVideo.
     * @example
     * // Create one FeedVideo
     * const FeedVideo = await prisma.feedVideo.create({
     *   data: {
     *     // ... data to create a FeedVideo
     *   }
     * })
     * 
     */
    create<T extends FeedVideoCreateArgs>(args: SelectSubset<T, FeedVideoCreateArgs<ExtArgs>>): Prisma__FeedVideoClient<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeedVideos.
     * @param {FeedVideoCreateManyArgs} args - Arguments to create many FeedVideos.
     * @example
     * // Create many FeedVideos
     * const feedVideo = await prisma.feedVideo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedVideoCreateManyArgs>(args?: SelectSubset<T, FeedVideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedVideos and returns the data saved in the database.
     * @param {FeedVideoCreateManyAndReturnArgs} args - Arguments to create many FeedVideos.
     * @example
     * // Create many FeedVideos
     * const feedVideo = await prisma.feedVideo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedVideos and only return the `id`
     * const feedVideoWithIdOnly = await prisma.feedVideo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedVideoCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedVideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeedVideo.
     * @param {FeedVideoDeleteArgs} args - Arguments to delete one FeedVideo.
     * @example
     * // Delete one FeedVideo
     * const FeedVideo = await prisma.feedVideo.delete({
     *   where: {
     *     // ... filter to delete one FeedVideo
     *   }
     * })
     * 
     */
    delete<T extends FeedVideoDeleteArgs>(args: SelectSubset<T, FeedVideoDeleteArgs<ExtArgs>>): Prisma__FeedVideoClient<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeedVideo.
     * @param {FeedVideoUpdateArgs} args - Arguments to update one FeedVideo.
     * @example
     * // Update one FeedVideo
     * const feedVideo = await prisma.feedVideo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedVideoUpdateArgs>(args: SelectSubset<T, FeedVideoUpdateArgs<ExtArgs>>): Prisma__FeedVideoClient<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeedVideos.
     * @param {FeedVideoDeleteManyArgs} args - Arguments to filter FeedVideos to delete.
     * @example
     * // Delete a few FeedVideos
     * const { count } = await prisma.feedVideo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedVideoDeleteManyArgs>(args?: SelectSubset<T, FeedVideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedVideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedVideos
     * const feedVideo = await prisma.feedVideo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedVideoUpdateManyArgs>(args: SelectSubset<T, FeedVideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedVideos and returns the data updated in the database.
     * @param {FeedVideoUpdateManyAndReturnArgs} args - Arguments to update many FeedVideos.
     * @example
     * // Update many FeedVideos
     * const feedVideo = await prisma.feedVideo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeedVideos and only return the `id`
     * const feedVideoWithIdOnly = await prisma.feedVideo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedVideoUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedVideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeedVideo.
     * @param {FeedVideoUpsertArgs} args - Arguments to update or create a FeedVideo.
     * @example
     * // Update or create a FeedVideo
     * const feedVideo = await prisma.feedVideo.upsert({
     *   create: {
     *     // ... data to create a FeedVideo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedVideo we want to update
     *   }
     * })
     */
    upsert<T extends FeedVideoUpsertArgs>(args: SelectSubset<T, FeedVideoUpsertArgs<ExtArgs>>): Prisma__FeedVideoClient<$Result.GetResult<Prisma.$FeedVideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeedVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedVideoCountArgs} args - Arguments to filter FeedVideos to count.
     * @example
     * // Count the number of FeedVideos
     * const count = await prisma.feedVideo.count({
     *   where: {
     *     // ... the filter for the FeedVideos we want to count
     *   }
     * })
    **/
    count<T extends FeedVideoCountArgs>(
      args?: Subset<T, FeedVideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedVideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedVideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeedVideoAggregateArgs>(args: Subset<T, FeedVideoAggregateArgs>): Prisma.PrismaPromise<GetFeedVideoAggregateType<T>>

    /**
     * Group by FeedVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedVideoGroupByArgs} args - Group by arguments.
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
      T extends FeedVideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedVideoGroupByArgs['orderBy'] }
        : { orderBy?: FeedVideoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeedVideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedVideo model
   */
  readonly fields: FeedVideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedVideo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedVideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the FeedVideo model
   */
  interface FeedVideoFieldRefs {
    readonly id: FieldRef<"FeedVideo", 'String'>
    readonly userId: FieldRef<"FeedVideo", 'String'>
    readonly description: FieldRef<"FeedVideo", 'String'>
    readonly likesCount: FieldRef<"FeedVideo", 'Int'>
    readonly commentsCount: FieldRef<"FeedVideo", 'Int'>
    readonly createdAt: FieldRef<"FeedVideo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeedVideo findUnique
   */
  export type FeedVideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * Filter, which FeedVideo to fetch.
     */
    where: FeedVideoWhereUniqueInput
  }

  /**
   * FeedVideo findUniqueOrThrow
   */
  export type FeedVideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * Filter, which FeedVideo to fetch.
     */
    where: FeedVideoWhereUniqueInput
  }

  /**
   * FeedVideo findFirst
   */
  export type FeedVideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * Filter, which FeedVideo to fetch.
     */
    where?: FeedVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedVideos to fetch.
     */
    orderBy?: FeedVideoOrderByWithRelationInput | FeedVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedVideos.
     */
    cursor?: FeedVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedVideos.
     */
    distinct?: FeedVideoScalarFieldEnum | FeedVideoScalarFieldEnum[]
  }

  /**
   * FeedVideo findFirstOrThrow
   */
  export type FeedVideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * Filter, which FeedVideo to fetch.
     */
    where?: FeedVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedVideos to fetch.
     */
    orderBy?: FeedVideoOrderByWithRelationInput | FeedVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedVideos.
     */
    cursor?: FeedVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedVideos.
     */
    distinct?: FeedVideoScalarFieldEnum | FeedVideoScalarFieldEnum[]
  }

  /**
   * FeedVideo findMany
   */
  export type FeedVideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * Filter, which FeedVideos to fetch.
     */
    where?: FeedVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedVideos to fetch.
     */
    orderBy?: FeedVideoOrderByWithRelationInput | FeedVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedVideos.
     */
    cursor?: FeedVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedVideos.
     */
    skip?: number
    distinct?: FeedVideoScalarFieldEnum | FeedVideoScalarFieldEnum[]
  }

  /**
   * FeedVideo create
   */
  export type FeedVideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * The data needed to create a FeedVideo.
     */
    data: XOR<FeedVideoCreateInput, FeedVideoUncheckedCreateInput>
  }

  /**
   * FeedVideo createMany
   */
  export type FeedVideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedVideos.
     */
    data: FeedVideoCreateManyInput | FeedVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedVideo createManyAndReturn
   */
  export type FeedVideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * The data used to create many FeedVideos.
     */
    data: FeedVideoCreateManyInput | FeedVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedVideo update
   */
  export type FeedVideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * The data needed to update a FeedVideo.
     */
    data: XOR<FeedVideoUpdateInput, FeedVideoUncheckedUpdateInput>
    /**
     * Choose, which FeedVideo to update.
     */
    where: FeedVideoWhereUniqueInput
  }

  /**
   * FeedVideo updateMany
   */
  export type FeedVideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedVideos.
     */
    data: XOR<FeedVideoUpdateManyMutationInput, FeedVideoUncheckedUpdateManyInput>
    /**
     * Filter which FeedVideos to update
     */
    where?: FeedVideoWhereInput
    /**
     * Limit how many FeedVideos to update.
     */
    limit?: number
  }

  /**
   * FeedVideo updateManyAndReturn
   */
  export type FeedVideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * The data used to update FeedVideos.
     */
    data: XOR<FeedVideoUpdateManyMutationInput, FeedVideoUncheckedUpdateManyInput>
    /**
     * Filter which FeedVideos to update
     */
    where?: FeedVideoWhereInput
    /**
     * Limit how many FeedVideos to update.
     */
    limit?: number
  }

  /**
   * FeedVideo upsert
   */
  export type FeedVideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * The filter to search for the FeedVideo to update in case it exists.
     */
    where: FeedVideoWhereUniqueInput
    /**
     * In case the FeedVideo found by the `where` argument doesn't exist, create a new FeedVideo with this data.
     */
    create: XOR<FeedVideoCreateInput, FeedVideoUncheckedCreateInput>
    /**
     * In case the FeedVideo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedVideoUpdateInput, FeedVideoUncheckedUpdateInput>
  }

  /**
   * FeedVideo delete
   */
  export type FeedVideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
    /**
     * Filter which FeedVideo to delete.
     */
    where: FeedVideoWhereUniqueInput
  }

  /**
   * FeedVideo deleteMany
   */
  export type FeedVideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedVideos to delete
     */
    where?: FeedVideoWhereInput
    /**
     * Limit how many FeedVideos to delete.
     */
    limit?: number
  }

  /**
   * FeedVideo without action
   */
  export type FeedVideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedVideo
     */
    select?: FeedVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedVideo
     */
    omit?: FeedVideoOmit<ExtArgs> | null
  }


  /**
   * Model VideoLike
   */

  export type AggregateVideoLike = {
    _count: VideoLikeCountAggregateOutputType | null
    _min: VideoLikeMinAggregateOutputType | null
    _max: VideoLikeMaxAggregateOutputType | null
  }

  export type VideoLikeMinAggregateOutputType = {
    id: string | null
    videoId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type VideoLikeMaxAggregateOutputType = {
    id: string | null
    videoId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type VideoLikeCountAggregateOutputType = {
    id: number
    videoId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type VideoLikeMinAggregateInputType = {
    id?: true
    videoId?: true
    userId?: true
    createdAt?: true
  }

  export type VideoLikeMaxAggregateInputType = {
    id?: true
    videoId?: true
    userId?: true
    createdAt?: true
  }

  export type VideoLikeCountAggregateInputType = {
    id?: true
    videoId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type VideoLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoLike to aggregate.
     */
    where?: VideoLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoLikes to fetch.
     */
    orderBy?: VideoLikeOrderByWithRelationInput | VideoLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VideoLikes
    **/
    _count?: true | VideoLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoLikeMaxAggregateInputType
  }

  export type GetVideoLikeAggregateType<T extends VideoLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoLike[P]>
      : GetScalarType<T[P], AggregateVideoLike[P]>
  }




  export type VideoLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoLikeWhereInput
    orderBy?: VideoLikeOrderByWithAggregationInput | VideoLikeOrderByWithAggregationInput[]
    by: VideoLikeScalarFieldEnum[] | VideoLikeScalarFieldEnum
    having?: VideoLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoLikeCountAggregateInputType | true
    _min?: VideoLikeMinAggregateInputType
    _max?: VideoLikeMaxAggregateInputType
  }

  export type VideoLikeGroupByOutputType = {
    id: string
    videoId: string
    userId: string
    createdAt: Date
    _count: VideoLikeCountAggregateOutputType | null
    _min: VideoLikeMinAggregateOutputType | null
    _max: VideoLikeMaxAggregateOutputType | null
  }

  type GetVideoLikeGroupByPayload<T extends VideoLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoLikeGroupByOutputType[P]>
            : GetScalarType<T[P], VideoLikeGroupByOutputType[P]>
        }
      >
    >


  export type VideoLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["videoLike"]>

  export type VideoLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["videoLike"]>

  export type VideoLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["videoLike"]>

  export type VideoLikeSelectScalar = {
    id?: boolean
    videoId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type VideoLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "videoId" | "userId" | "createdAt", ExtArgs["result"]["videoLike"]>

  export type $VideoLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoLike"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      videoId: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["videoLike"]>
    composites: {}
  }

  type VideoLikeGetPayload<S extends boolean | null | undefined | VideoLikeDefaultArgs> = $Result.GetResult<Prisma.$VideoLikePayload, S>

  type VideoLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoLikeCountAggregateInputType | true
    }

  export interface VideoLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VideoLike'], meta: { name: 'VideoLike' } }
    /**
     * Find zero or one VideoLike that matches the filter.
     * @param {VideoLikeFindUniqueArgs} args - Arguments to find a VideoLike
     * @example
     * // Get one VideoLike
     * const videoLike = await prisma.videoLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoLikeFindUniqueArgs>(args: SelectSubset<T, VideoLikeFindUniqueArgs<ExtArgs>>): Prisma__VideoLikeClient<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VideoLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoLikeFindUniqueOrThrowArgs} args - Arguments to find a VideoLike
     * @example
     * // Get one VideoLike
     * const videoLike = await prisma.videoLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoLikeClient<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoLikeFindFirstArgs} args - Arguments to find a VideoLike
     * @example
     * // Get one VideoLike
     * const videoLike = await prisma.videoLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoLikeFindFirstArgs>(args?: SelectSubset<T, VideoLikeFindFirstArgs<ExtArgs>>): Prisma__VideoLikeClient<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoLikeFindFirstOrThrowArgs} args - Arguments to find a VideoLike
     * @example
     * // Get one VideoLike
     * const videoLike = await prisma.videoLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoLikeClient<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VideoLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoLikes
     * const videoLikes = await prisma.videoLike.findMany()
     * 
     * // Get first 10 VideoLikes
     * const videoLikes = await prisma.videoLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoLikeWithIdOnly = await prisma.videoLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoLikeFindManyArgs>(args?: SelectSubset<T, VideoLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VideoLike.
     * @param {VideoLikeCreateArgs} args - Arguments to create a VideoLike.
     * @example
     * // Create one VideoLike
     * const VideoLike = await prisma.videoLike.create({
     *   data: {
     *     // ... data to create a VideoLike
     *   }
     * })
     * 
     */
    create<T extends VideoLikeCreateArgs>(args: SelectSubset<T, VideoLikeCreateArgs<ExtArgs>>): Prisma__VideoLikeClient<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VideoLikes.
     * @param {VideoLikeCreateManyArgs} args - Arguments to create many VideoLikes.
     * @example
     * // Create many VideoLikes
     * const videoLike = await prisma.videoLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoLikeCreateManyArgs>(args?: SelectSubset<T, VideoLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VideoLikes and returns the data saved in the database.
     * @param {VideoLikeCreateManyAndReturnArgs} args - Arguments to create many VideoLikes.
     * @example
     * // Create many VideoLikes
     * const videoLike = await prisma.videoLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VideoLikes and only return the `id`
     * const videoLikeWithIdOnly = await prisma.videoLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VideoLike.
     * @param {VideoLikeDeleteArgs} args - Arguments to delete one VideoLike.
     * @example
     * // Delete one VideoLike
     * const VideoLike = await prisma.videoLike.delete({
     *   where: {
     *     // ... filter to delete one VideoLike
     *   }
     * })
     * 
     */
    delete<T extends VideoLikeDeleteArgs>(args: SelectSubset<T, VideoLikeDeleteArgs<ExtArgs>>): Prisma__VideoLikeClient<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VideoLike.
     * @param {VideoLikeUpdateArgs} args - Arguments to update one VideoLike.
     * @example
     * // Update one VideoLike
     * const videoLike = await prisma.videoLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoLikeUpdateArgs>(args: SelectSubset<T, VideoLikeUpdateArgs<ExtArgs>>): Prisma__VideoLikeClient<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VideoLikes.
     * @param {VideoLikeDeleteManyArgs} args - Arguments to filter VideoLikes to delete.
     * @example
     * // Delete a few VideoLikes
     * const { count } = await prisma.videoLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoLikeDeleteManyArgs>(args?: SelectSubset<T, VideoLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoLikes
     * const videoLike = await prisma.videoLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoLikeUpdateManyArgs>(args: SelectSubset<T, VideoLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoLikes and returns the data updated in the database.
     * @param {VideoLikeUpdateManyAndReturnArgs} args - Arguments to update many VideoLikes.
     * @example
     * // Update many VideoLikes
     * const videoLike = await prisma.videoLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VideoLikes and only return the `id`
     * const videoLikeWithIdOnly = await prisma.videoLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VideoLike.
     * @param {VideoLikeUpsertArgs} args - Arguments to update or create a VideoLike.
     * @example
     * // Update or create a VideoLike
     * const videoLike = await prisma.videoLike.upsert({
     *   create: {
     *     // ... data to create a VideoLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VideoLike we want to update
     *   }
     * })
     */
    upsert<T extends VideoLikeUpsertArgs>(args: SelectSubset<T, VideoLikeUpsertArgs<ExtArgs>>): Prisma__VideoLikeClient<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VideoLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoLikeCountArgs} args - Arguments to filter VideoLikes to count.
     * @example
     * // Count the number of VideoLikes
     * const count = await prisma.videoLike.count({
     *   where: {
     *     // ... the filter for the VideoLikes we want to count
     *   }
     * })
    **/
    count<T extends VideoLikeCountArgs>(
      args?: Subset<T, VideoLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VideoLikeAggregateArgs>(args: Subset<T, VideoLikeAggregateArgs>): Prisma.PrismaPromise<GetVideoLikeAggregateType<T>>

    /**
     * Group by VideoLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoLikeGroupByArgs} args - Group by arguments.
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
      T extends VideoLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoLikeGroupByArgs['orderBy'] }
        : { orderBy?: VideoLikeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VideoLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VideoLike model
   */
  readonly fields: VideoLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VideoLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the VideoLike model
   */
  interface VideoLikeFieldRefs {
    readonly id: FieldRef<"VideoLike", 'String'>
    readonly videoId: FieldRef<"VideoLike", 'String'>
    readonly userId: FieldRef<"VideoLike", 'String'>
    readonly createdAt: FieldRef<"VideoLike", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VideoLike findUnique
   */
  export type VideoLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * Filter, which VideoLike to fetch.
     */
    where: VideoLikeWhereUniqueInput
  }

  /**
   * VideoLike findUniqueOrThrow
   */
  export type VideoLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * Filter, which VideoLike to fetch.
     */
    where: VideoLikeWhereUniqueInput
  }

  /**
   * VideoLike findFirst
   */
  export type VideoLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * Filter, which VideoLike to fetch.
     */
    where?: VideoLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoLikes to fetch.
     */
    orderBy?: VideoLikeOrderByWithRelationInput | VideoLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoLikes.
     */
    cursor?: VideoLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoLikes.
     */
    distinct?: VideoLikeScalarFieldEnum | VideoLikeScalarFieldEnum[]
  }

  /**
   * VideoLike findFirstOrThrow
   */
  export type VideoLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * Filter, which VideoLike to fetch.
     */
    where?: VideoLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoLikes to fetch.
     */
    orderBy?: VideoLikeOrderByWithRelationInput | VideoLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoLikes.
     */
    cursor?: VideoLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoLikes.
     */
    distinct?: VideoLikeScalarFieldEnum | VideoLikeScalarFieldEnum[]
  }

  /**
   * VideoLike findMany
   */
  export type VideoLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * Filter, which VideoLikes to fetch.
     */
    where?: VideoLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoLikes to fetch.
     */
    orderBy?: VideoLikeOrderByWithRelationInput | VideoLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VideoLikes.
     */
    cursor?: VideoLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoLikes.
     */
    skip?: number
    distinct?: VideoLikeScalarFieldEnum | VideoLikeScalarFieldEnum[]
  }

  /**
   * VideoLike create
   */
  export type VideoLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * The data needed to create a VideoLike.
     */
    data: XOR<VideoLikeCreateInput, VideoLikeUncheckedCreateInput>
  }

  /**
   * VideoLike createMany
   */
  export type VideoLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VideoLikes.
     */
    data: VideoLikeCreateManyInput | VideoLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoLike createManyAndReturn
   */
  export type VideoLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * The data used to create many VideoLikes.
     */
    data: VideoLikeCreateManyInput | VideoLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoLike update
   */
  export type VideoLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * The data needed to update a VideoLike.
     */
    data: XOR<VideoLikeUpdateInput, VideoLikeUncheckedUpdateInput>
    /**
     * Choose, which VideoLike to update.
     */
    where: VideoLikeWhereUniqueInput
  }

  /**
   * VideoLike updateMany
   */
  export type VideoLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VideoLikes.
     */
    data: XOR<VideoLikeUpdateManyMutationInput, VideoLikeUncheckedUpdateManyInput>
    /**
     * Filter which VideoLikes to update
     */
    where?: VideoLikeWhereInput
    /**
     * Limit how many VideoLikes to update.
     */
    limit?: number
  }

  /**
   * VideoLike updateManyAndReturn
   */
  export type VideoLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * The data used to update VideoLikes.
     */
    data: XOR<VideoLikeUpdateManyMutationInput, VideoLikeUncheckedUpdateManyInput>
    /**
     * Filter which VideoLikes to update
     */
    where?: VideoLikeWhereInput
    /**
     * Limit how many VideoLikes to update.
     */
    limit?: number
  }

  /**
   * VideoLike upsert
   */
  export type VideoLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * The filter to search for the VideoLike to update in case it exists.
     */
    where: VideoLikeWhereUniqueInput
    /**
     * In case the VideoLike found by the `where` argument doesn't exist, create a new VideoLike with this data.
     */
    create: XOR<VideoLikeCreateInput, VideoLikeUncheckedCreateInput>
    /**
     * In case the VideoLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoLikeUpdateInput, VideoLikeUncheckedUpdateInput>
  }

  /**
   * VideoLike delete
   */
  export type VideoLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * Filter which VideoLike to delete.
     */
    where: VideoLikeWhereUniqueInput
  }

  /**
   * VideoLike deleteMany
   */
  export type VideoLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoLikes to delete
     */
    where?: VideoLikeWhereInput
    /**
     * Limit how many VideoLikes to delete.
     */
    limit?: number
  }

  /**
   * VideoLike without action
   */
  export type VideoLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
  }


  /**
   * Model VideoComment
   */

  export type AggregateVideoComment = {
    _count: VideoCommentCountAggregateOutputType | null
    _min: VideoCommentMinAggregateOutputType | null
    _max: VideoCommentMaxAggregateOutputType | null
  }

  export type VideoCommentMinAggregateOutputType = {
    id: string | null
    videoId: string | null
    userId: string | null
    parentId: string | null
    text: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoCommentMaxAggregateOutputType = {
    id: string | null
    videoId: string | null
    userId: string | null
    parentId: string | null
    text: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoCommentCountAggregateOutputType = {
    id: number
    videoId: number
    userId: number
    parentId: number
    text: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VideoCommentMinAggregateInputType = {
    id?: true
    videoId?: true
    userId?: true
    parentId?: true
    text?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoCommentMaxAggregateInputType = {
    id?: true
    videoId?: true
    userId?: true
    parentId?: true
    text?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoCommentCountAggregateInputType = {
    id?: true
    videoId?: true
    userId?: true
    parentId?: true
    text?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VideoCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoComment to aggregate.
     */
    where?: VideoCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoComments to fetch.
     */
    orderBy?: VideoCommentOrderByWithRelationInput | VideoCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VideoComments
    **/
    _count?: true | VideoCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoCommentMaxAggregateInputType
  }

  export type GetVideoCommentAggregateType<T extends VideoCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoComment[P]>
      : GetScalarType<T[P], AggregateVideoComment[P]>
  }




  export type VideoCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoCommentWhereInput
    orderBy?: VideoCommentOrderByWithAggregationInput | VideoCommentOrderByWithAggregationInput[]
    by: VideoCommentScalarFieldEnum[] | VideoCommentScalarFieldEnum
    having?: VideoCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoCommentCountAggregateInputType | true
    _min?: VideoCommentMinAggregateInputType
    _max?: VideoCommentMaxAggregateInputType
  }

  export type VideoCommentGroupByOutputType = {
    id: string
    videoId: string
    userId: string
    parentId: string | null
    text: string
    createdAt: Date
    updatedAt: Date
    _count: VideoCommentCountAggregateOutputType | null
    _min: VideoCommentMinAggregateOutputType | null
    _max: VideoCommentMaxAggregateOutputType | null
  }

  type GetVideoCommentGroupByPayload<T extends VideoCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoCommentGroupByOutputType[P]>
            : GetScalarType<T[P], VideoCommentGroupByOutputType[P]>
        }
      >
    >


  export type VideoCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    parentId?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["videoComment"]>

  export type VideoCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    parentId?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["videoComment"]>

  export type VideoCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    parentId?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["videoComment"]>

  export type VideoCommentSelectScalar = {
    id?: boolean
    videoId?: boolean
    userId?: boolean
    parentId?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VideoCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "videoId" | "userId" | "parentId" | "text" | "createdAt" | "updatedAt", ExtArgs["result"]["videoComment"]>

  export type $VideoCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoComment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      videoId: string
      userId: string
      parentId: string | null
      text: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["videoComment"]>
    composites: {}
  }

  type VideoCommentGetPayload<S extends boolean | null | undefined | VideoCommentDefaultArgs> = $Result.GetResult<Prisma.$VideoCommentPayload, S>

  type VideoCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoCommentCountAggregateInputType | true
    }

  export interface VideoCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VideoComment'], meta: { name: 'VideoComment' } }
    /**
     * Find zero or one VideoComment that matches the filter.
     * @param {VideoCommentFindUniqueArgs} args - Arguments to find a VideoComment
     * @example
     * // Get one VideoComment
     * const videoComment = await prisma.videoComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoCommentFindUniqueArgs>(args: SelectSubset<T, VideoCommentFindUniqueArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VideoComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoCommentFindUniqueOrThrowArgs} args - Arguments to find a VideoComment
     * @example
     * // Get one VideoComment
     * const videoComment = await prisma.videoComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCommentFindFirstArgs} args - Arguments to find a VideoComment
     * @example
     * // Get one VideoComment
     * const videoComment = await prisma.videoComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoCommentFindFirstArgs>(args?: SelectSubset<T, VideoCommentFindFirstArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCommentFindFirstOrThrowArgs} args - Arguments to find a VideoComment
     * @example
     * // Get one VideoComment
     * const videoComment = await prisma.videoComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VideoComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoComments
     * const videoComments = await prisma.videoComment.findMany()
     * 
     * // Get first 10 VideoComments
     * const videoComments = await prisma.videoComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoCommentWithIdOnly = await prisma.videoComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoCommentFindManyArgs>(args?: SelectSubset<T, VideoCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VideoComment.
     * @param {VideoCommentCreateArgs} args - Arguments to create a VideoComment.
     * @example
     * // Create one VideoComment
     * const VideoComment = await prisma.videoComment.create({
     *   data: {
     *     // ... data to create a VideoComment
     *   }
     * })
     * 
     */
    create<T extends VideoCommentCreateArgs>(args: SelectSubset<T, VideoCommentCreateArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VideoComments.
     * @param {VideoCommentCreateManyArgs} args - Arguments to create many VideoComments.
     * @example
     * // Create many VideoComments
     * const videoComment = await prisma.videoComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoCommentCreateManyArgs>(args?: SelectSubset<T, VideoCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VideoComments and returns the data saved in the database.
     * @param {VideoCommentCreateManyAndReturnArgs} args - Arguments to create many VideoComments.
     * @example
     * // Create many VideoComments
     * const videoComment = await prisma.videoComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VideoComments and only return the `id`
     * const videoCommentWithIdOnly = await prisma.videoComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VideoComment.
     * @param {VideoCommentDeleteArgs} args - Arguments to delete one VideoComment.
     * @example
     * // Delete one VideoComment
     * const VideoComment = await prisma.videoComment.delete({
     *   where: {
     *     // ... filter to delete one VideoComment
     *   }
     * })
     * 
     */
    delete<T extends VideoCommentDeleteArgs>(args: SelectSubset<T, VideoCommentDeleteArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VideoComment.
     * @param {VideoCommentUpdateArgs} args - Arguments to update one VideoComment.
     * @example
     * // Update one VideoComment
     * const videoComment = await prisma.videoComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoCommentUpdateArgs>(args: SelectSubset<T, VideoCommentUpdateArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VideoComments.
     * @param {VideoCommentDeleteManyArgs} args - Arguments to filter VideoComments to delete.
     * @example
     * // Delete a few VideoComments
     * const { count } = await prisma.videoComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoCommentDeleteManyArgs>(args?: SelectSubset<T, VideoCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoComments
     * const videoComment = await prisma.videoComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoCommentUpdateManyArgs>(args: SelectSubset<T, VideoCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoComments and returns the data updated in the database.
     * @param {VideoCommentUpdateManyAndReturnArgs} args - Arguments to update many VideoComments.
     * @example
     * // Update many VideoComments
     * const videoComment = await prisma.videoComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VideoComments and only return the `id`
     * const videoCommentWithIdOnly = await prisma.videoComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VideoComment.
     * @param {VideoCommentUpsertArgs} args - Arguments to update or create a VideoComment.
     * @example
     * // Update or create a VideoComment
     * const videoComment = await prisma.videoComment.upsert({
     *   create: {
     *     // ... data to create a VideoComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VideoComment we want to update
     *   }
     * })
     */
    upsert<T extends VideoCommentUpsertArgs>(args: SelectSubset<T, VideoCommentUpsertArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VideoComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCommentCountArgs} args - Arguments to filter VideoComments to count.
     * @example
     * // Count the number of VideoComments
     * const count = await prisma.videoComment.count({
     *   where: {
     *     // ... the filter for the VideoComments we want to count
     *   }
     * })
    **/
    count<T extends VideoCommentCountArgs>(
      args?: Subset<T, VideoCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VideoCommentAggregateArgs>(args: Subset<T, VideoCommentAggregateArgs>): Prisma.PrismaPromise<GetVideoCommentAggregateType<T>>

    /**
     * Group by VideoComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCommentGroupByArgs} args - Group by arguments.
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
      T extends VideoCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoCommentGroupByArgs['orderBy'] }
        : { orderBy?: VideoCommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VideoCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VideoComment model
   */
  readonly fields: VideoCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VideoComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the VideoComment model
   */
  interface VideoCommentFieldRefs {
    readonly id: FieldRef<"VideoComment", 'String'>
    readonly videoId: FieldRef<"VideoComment", 'String'>
    readonly userId: FieldRef<"VideoComment", 'String'>
    readonly parentId: FieldRef<"VideoComment", 'String'>
    readonly text: FieldRef<"VideoComment", 'String'>
    readonly createdAt: FieldRef<"VideoComment", 'DateTime'>
    readonly updatedAt: FieldRef<"VideoComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VideoComment findUnique
   */
  export type VideoCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Filter, which VideoComment to fetch.
     */
    where: VideoCommentWhereUniqueInput
  }

  /**
   * VideoComment findUniqueOrThrow
   */
  export type VideoCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Filter, which VideoComment to fetch.
     */
    where: VideoCommentWhereUniqueInput
  }

  /**
   * VideoComment findFirst
   */
  export type VideoCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Filter, which VideoComment to fetch.
     */
    where?: VideoCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoComments to fetch.
     */
    orderBy?: VideoCommentOrderByWithRelationInput | VideoCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoComments.
     */
    cursor?: VideoCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoComments.
     */
    distinct?: VideoCommentScalarFieldEnum | VideoCommentScalarFieldEnum[]
  }

  /**
   * VideoComment findFirstOrThrow
   */
  export type VideoCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Filter, which VideoComment to fetch.
     */
    where?: VideoCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoComments to fetch.
     */
    orderBy?: VideoCommentOrderByWithRelationInput | VideoCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoComments.
     */
    cursor?: VideoCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoComments.
     */
    distinct?: VideoCommentScalarFieldEnum | VideoCommentScalarFieldEnum[]
  }

  /**
   * VideoComment findMany
   */
  export type VideoCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Filter, which VideoComments to fetch.
     */
    where?: VideoCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoComments to fetch.
     */
    orderBy?: VideoCommentOrderByWithRelationInput | VideoCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VideoComments.
     */
    cursor?: VideoCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoComments.
     */
    skip?: number
    distinct?: VideoCommentScalarFieldEnum | VideoCommentScalarFieldEnum[]
  }

  /**
   * VideoComment create
   */
  export type VideoCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * The data needed to create a VideoComment.
     */
    data: XOR<VideoCommentCreateInput, VideoCommentUncheckedCreateInput>
  }

  /**
   * VideoComment createMany
   */
  export type VideoCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VideoComments.
     */
    data: VideoCommentCreateManyInput | VideoCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoComment createManyAndReturn
   */
  export type VideoCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * The data used to create many VideoComments.
     */
    data: VideoCommentCreateManyInput | VideoCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoComment update
   */
  export type VideoCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * The data needed to update a VideoComment.
     */
    data: XOR<VideoCommentUpdateInput, VideoCommentUncheckedUpdateInput>
    /**
     * Choose, which VideoComment to update.
     */
    where: VideoCommentWhereUniqueInput
  }

  /**
   * VideoComment updateMany
   */
  export type VideoCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VideoComments.
     */
    data: XOR<VideoCommentUpdateManyMutationInput, VideoCommentUncheckedUpdateManyInput>
    /**
     * Filter which VideoComments to update
     */
    where?: VideoCommentWhereInput
    /**
     * Limit how many VideoComments to update.
     */
    limit?: number
  }

  /**
   * VideoComment updateManyAndReturn
   */
  export type VideoCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * The data used to update VideoComments.
     */
    data: XOR<VideoCommentUpdateManyMutationInput, VideoCommentUncheckedUpdateManyInput>
    /**
     * Filter which VideoComments to update
     */
    where?: VideoCommentWhereInput
    /**
     * Limit how many VideoComments to update.
     */
    limit?: number
  }

  /**
   * VideoComment upsert
   */
  export type VideoCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * The filter to search for the VideoComment to update in case it exists.
     */
    where: VideoCommentWhereUniqueInput
    /**
     * In case the VideoComment found by the `where` argument doesn't exist, create a new VideoComment with this data.
     */
    create: XOR<VideoCommentCreateInput, VideoCommentUncheckedCreateInput>
    /**
     * In case the VideoComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoCommentUpdateInput, VideoCommentUncheckedUpdateInput>
  }

  /**
   * VideoComment delete
   */
  export type VideoCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Filter which VideoComment to delete.
     */
    where: VideoCommentWhereUniqueInput
  }

  /**
   * VideoComment deleteMany
   */
  export type VideoCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoComments to delete
     */
    where?: VideoCommentWhereInput
    /**
     * Limit how many VideoComments to delete.
     */
    limit?: number
  }

  /**
   * VideoComment without action
   */
  export type VideoCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    phone: 'phone',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FeedVideoScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    description: 'description',
    likesCount: 'likesCount',
    commentsCount: 'commentsCount',
    createdAt: 'createdAt'
  };

  export type FeedVideoScalarFieldEnum = (typeof FeedVideoScalarFieldEnum)[keyof typeof FeedVideoScalarFieldEnum]


  export const VideoLikeScalarFieldEnum: {
    id: 'id',
    videoId: 'videoId',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type VideoLikeScalarFieldEnum = (typeof VideoLikeScalarFieldEnum)[keyof typeof VideoLikeScalarFieldEnum]


  export const VideoCommentScalarFieldEnum: {
    id: 'id',
    videoId: 'videoId',
    userId: 'userId',
    parentId: 'parentId',
    text: 'text',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VideoCommentScalarFieldEnum = (typeof VideoCommentScalarFieldEnum)[keyof typeof VideoCommentScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    description?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    description?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    description?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FeedVideoWhereInput = {
    AND?: FeedVideoWhereInput | FeedVideoWhereInput[]
    OR?: FeedVideoWhereInput[]
    NOT?: FeedVideoWhereInput | FeedVideoWhereInput[]
    id?: StringFilter<"FeedVideo"> | string
    userId?: StringFilter<"FeedVideo"> | string
    description?: StringFilter<"FeedVideo"> | string
    likesCount?: IntFilter<"FeedVideo"> | number
    commentsCount?: IntFilter<"FeedVideo"> | number
    createdAt?: DateTimeFilter<"FeedVideo"> | Date | string
  }

  export type FeedVideoOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedVideoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedVideoWhereInput | FeedVideoWhereInput[]
    OR?: FeedVideoWhereInput[]
    NOT?: FeedVideoWhereInput | FeedVideoWhereInput[]
    userId?: StringFilter<"FeedVideo"> | string
    description?: StringFilter<"FeedVideo"> | string
    likesCount?: IntFilter<"FeedVideo"> | number
    commentsCount?: IntFilter<"FeedVideo"> | number
    createdAt?: DateTimeFilter<"FeedVideo"> | Date | string
  }, "id">

  export type FeedVideoOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
    _count?: FeedVideoCountOrderByAggregateInput
    _avg?: FeedVideoAvgOrderByAggregateInput
    _max?: FeedVideoMaxOrderByAggregateInput
    _min?: FeedVideoMinOrderByAggregateInput
    _sum?: FeedVideoSumOrderByAggregateInput
  }

  export type FeedVideoScalarWhereWithAggregatesInput = {
    AND?: FeedVideoScalarWhereWithAggregatesInput | FeedVideoScalarWhereWithAggregatesInput[]
    OR?: FeedVideoScalarWhereWithAggregatesInput[]
    NOT?: FeedVideoScalarWhereWithAggregatesInput | FeedVideoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeedVideo"> | string
    userId?: StringWithAggregatesFilter<"FeedVideo"> | string
    description?: StringWithAggregatesFilter<"FeedVideo"> | string
    likesCount?: IntWithAggregatesFilter<"FeedVideo"> | number
    commentsCount?: IntWithAggregatesFilter<"FeedVideo"> | number
    createdAt?: DateTimeWithAggregatesFilter<"FeedVideo"> | Date | string
  }

  export type VideoLikeWhereInput = {
    AND?: VideoLikeWhereInput | VideoLikeWhereInput[]
    OR?: VideoLikeWhereInput[]
    NOT?: VideoLikeWhereInput | VideoLikeWhereInput[]
    id?: StringFilter<"VideoLike"> | string
    videoId?: StringFilter<"VideoLike"> | string
    userId?: StringFilter<"VideoLike"> | string
    createdAt?: DateTimeFilter<"VideoLike"> | Date | string
  }

  export type VideoLikeOrderByWithRelationInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    videoId_userId?: VideoLikeVideoIdUserIdCompoundUniqueInput
    AND?: VideoLikeWhereInput | VideoLikeWhereInput[]
    OR?: VideoLikeWhereInput[]
    NOT?: VideoLikeWhereInput | VideoLikeWhereInput[]
    videoId?: StringFilter<"VideoLike"> | string
    userId?: StringFilter<"VideoLike"> | string
    createdAt?: DateTimeFilter<"VideoLike"> | Date | string
  }, "id" | "videoId_userId">

  export type VideoLikeOrderByWithAggregationInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: VideoLikeCountOrderByAggregateInput
    _max?: VideoLikeMaxOrderByAggregateInput
    _min?: VideoLikeMinOrderByAggregateInput
  }

  export type VideoLikeScalarWhereWithAggregatesInput = {
    AND?: VideoLikeScalarWhereWithAggregatesInput | VideoLikeScalarWhereWithAggregatesInput[]
    OR?: VideoLikeScalarWhereWithAggregatesInput[]
    NOT?: VideoLikeScalarWhereWithAggregatesInput | VideoLikeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VideoLike"> | string
    videoId?: StringWithAggregatesFilter<"VideoLike"> | string
    userId?: StringWithAggregatesFilter<"VideoLike"> | string
    createdAt?: DateTimeWithAggregatesFilter<"VideoLike"> | Date | string
  }

  export type VideoCommentWhereInput = {
    AND?: VideoCommentWhereInput | VideoCommentWhereInput[]
    OR?: VideoCommentWhereInput[]
    NOT?: VideoCommentWhereInput | VideoCommentWhereInput[]
    id?: StringFilter<"VideoComment"> | string
    videoId?: StringFilter<"VideoComment"> | string
    userId?: StringFilter<"VideoComment"> | string
    parentId?: StringNullableFilter<"VideoComment"> | string | null
    text?: StringFilter<"VideoComment"> | string
    createdAt?: DateTimeFilter<"VideoComment"> | Date | string
    updatedAt?: DateTimeFilter<"VideoComment"> | Date | string
  }

  export type VideoCommentOrderByWithRelationInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VideoCommentWhereInput | VideoCommentWhereInput[]
    OR?: VideoCommentWhereInput[]
    NOT?: VideoCommentWhereInput | VideoCommentWhereInput[]
    videoId?: StringFilter<"VideoComment"> | string
    userId?: StringFilter<"VideoComment"> | string
    parentId?: StringNullableFilter<"VideoComment"> | string | null
    text?: StringFilter<"VideoComment"> | string
    createdAt?: DateTimeFilter<"VideoComment"> | Date | string
    updatedAt?: DateTimeFilter<"VideoComment"> | Date | string
  }, "id">

  export type VideoCommentOrderByWithAggregationInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VideoCommentCountOrderByAggregateInput
    _max?: VideoCommentMaxOrderByAggregateInput
    _min?: VideoCommentMinOrderByAggregateInput
  }

  export type VideoCommentScalarWhereWithAggregatesInput = {
    AND?: VideoCommentScalarWhereWithAggregatesInput | VideoCommentScalarWhereWithAggregatesInput[]
    OR?: VideoCommentScalarWhereWithAggregatesInput[]
    NOT?: VideoCommentScalarWhereWithAggregatesInput | VideoCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VideoComment"> | string
    videoId?: StringWithAggregatesFilter<"VideoComment"> | string
    userId?: StringWithAggregatesFilter<"VideoComment"> | string
    parentId?: StringNullableWithAggregatesFilter<"VideoComment"> | string | null
    text?: StringWithAggregatesFilter<"VideoComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"VideoComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VideoComment"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string
    phone?: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string
    phone?: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password?: string
    phone?: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedVideoCreateInput = {
    id: string
    userId: string
    description: string
    likesCount?: number
    commentsCount?: number
    createdAt?: Date | string
  }

  export type FeedVideoUncheckedCreateInput = {
    id: string
    userId: string
    description: string
    likesCount?: number
    commentsCount?: number
    createdAt?: Date | string
  }

  export type FeedVideoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedVideoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedVideoCreateManyInput = {
    id: string
    userId: string
    description: string
    likesCount?: number
    commentsCount?: number
    createdAt?: Date | string
  }

  export type FeedVideoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedVideoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeCreateInput = {
    id?: string
    videoId: string
    userId: string
    createdAt?: Date | string
  }

  export type VideoLikeUncheckedCreateInput = {
    id?: string
    videoId: string
    userId: string
    createdAt?: Date | string
  }

  export type VideoLikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeCreateManyInput = {
    id?: string
    videoId: string
    userId: string
    createdAt?: Date | string
  }

  export type VideoLikeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoCommentCreateInput = {
    id?: string
    videoId: string
    userId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoCommentUncheckedCreateInput = {
    id?: string
    videoId: string
    userId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoCommentCreateManyInput = {
    id?: string
    videoId: string
    userId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type FeedVideoCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedVideoAvgOrderByAggregateInput = {
    likesCount?: SortOrder
    commentsCount?: SortOrder
  }

  export type FeedVideoMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedVideoMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedVideoSumOrderByAggregateInput = {
    likesCount?: SortOrder
    commentsCount?: SortOrder
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

  export type VideoLikeVideoIdUserIdCompoundUniqueInput = {
    videoId: string
    userId: string
  }

  export type VideoLikeCountOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoLikeMinOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VideoCommentCountOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoCommentMinOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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