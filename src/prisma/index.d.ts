
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
 * Model Video
 * 
 */
export type Video = $Result.DefaultSelection<Prisma.$VideoPayload>
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
 * Enums
 */
export namespace $Enums {
  export const VideoStatus: {
  UPLOADING: 'UPLOADING',
  PROCESSING: 'PROCESSING',
  READY: 'READY',
  FAILED: 'FAILED',
  DELETED: 'DELETED'
};

export type VideoStatus = (typeof VideoStatus)[keyof typeof VideoStatus]

}

export type VideoStatus = $Enums.VideoStatus

export const VideoStatus: typeof $Enums.VideoStatus

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
   * `prisma.video`: Exposes CRUD operations for the **Video** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Videos
    * const videos = await prisma.video.findMany()
    * ```
    */
  get video(): Prisma.VideoDelegate<ExtArgs, ClientOptions>;

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
    Video: 'Video',
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
      modelProps: "user" | "video" | "videoLike" | "videoComment"
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
      Video: {
        payload: Prisma.$VideoPayload<ExtArgs>
        fields: Prisma.VideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          findFirst: {
            args: Prisma.VideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          findMany: {
            args: Prisma.VideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          create: {
            args: Prisma.VideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          createMany: {
            args: Prisma.VideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          delete: {
            args: Prisma.VideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          update: {
            args: Prisma.VideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          deleteMany: {
            args: Prisma.VideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          upsert: {
            args: Prisma.VideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          aggregate: {
            args: Prisma.VideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideo>
          }
          groupBy: {
            args: Prisma.VideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoCountArgs<ExtArgs>
            result: $Utils.Optional<VideoCountAggregateOutputType> | number
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
    video?: VideoOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    videos: number
    likes: number
    comments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videos?: boolean | UserCountOutputTypeCountVideosArgs
    likes?: boolean | UserCountOutputTypeCountLikesArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoCommentWhereInput
  }


  /**
   * Count Type VideoCountOutputType
   */

  export type VideoCountOutputType = {
    likes: number
    comments: number
  }

  export type VideoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    likes?: boolean | VideoCountOutputTypeCountLikesArgs
    comments?: boolean | VideoCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoCountOutputType
     */
    select?: VideoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoLikeWhereInput
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoCommentWhereInput
  }


  /**
   * Count Type VideoCommentCountOutputType
   */

  export type VideoCommentCountOutputType = {
    replies: number
  }

  export type VideoCommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | VideoCommentCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * VideoCommentCountOutputType without action
   */
  export type VideoCommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoCommentCountOutputType
     */
    select?: VideoCommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VideoCommentCountOutputType without action
   */
  export type VideoCommentCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoCommentWhereInput
  }


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
    videos?: boolean | User$videosArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
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
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videos?: boolean | User$videosArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      videos: Prisma.$VideoPayload<ExtArgs>[]
      likes: Prisma.$VideoLikePayload<ExtArgs>[]
      comments: Prisma.$VideoCommentPayload<ExtArgs>[]
    }
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
    videos<T extends User$videosArgs<ExtArgs> = {}>(args?: Subset<T, User$videosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends User$likesArgs<ExtArgs> = {}>(args?: Subset<T, User$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
   * User.videos
   */
  export type User$videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    cursor?: VideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * User.likes
   */
  export type User$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
    where?: VideoLikeWhereInput
    orderBy?: VideoLikeOrderByWithRelationInput | VideoLikeOrderByWithRelationInput[]
    cursor?: VideoLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoLikeScalarFieldEnum | VideoLikeScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
    where?: VideoCommentWhereInput
    orderBy?: VideoCommentOrderByWithRelationInput | VideoCommentOrderByWithRelationInput[]
    cursor?: VideoCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoCommentScalarFieldEnum | VideoCommentScalarFieldEnum[]
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Video
   */

  export type AggregateVideo = {
    _count: VideoCountAggregateOutputType | null
    _avg: VideoAvgAggregateOutputType | null
    _sum: VideoSumAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  }

  export type VideoAvgAggregateOutputType = {
    size: number | null
    duration: number | null
    likesCount: number | null
    commentsCount: number | null
  }

  export type VideoSumAggregateOutputType = {
    size: number | null
    duration: number | null
    likesCount: number | null
    commentsCount: number | null
  }

  export type VideoMinAggregateOutputType = {
    id: string | null
    originalName: string | null
    fileName: string | null
    s3Key: string | null
    url: string | null
    cdnUrl: string | null
    thumbnailUrl: string | null
    size: number | null
    duration: number | null
    mimeType: string | null
    resolution: string | null
    status: $Enums.VideoStatus | null
    userId: string | null
    description: string | null
    likesCount: number | null
    commentsCount: number | null
    publishedAt: Date | null
    processedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoMaxAggregateOutputType = {
    id: string | null
    originalName: string | null
    fileName: string | null
    s3Key: string | null
    url: string | null
    cdnUrl: string | null
    thumbnailUrl: string | null
    size: number | null
    duration: number | null
    mimeType: string | null
    resolution: string | null
    status: $Enums.VideoStatus | null
    userId: string | null
    description: string | null
    likesCount: number | null
    commentsCount: number | null
    publishedAt: Date | null
    processedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoCountAggregateOutputType = {
    id: number
    originalName: number
    fileName: number
    s3Key: number
    url: number
    cdnUrl: number
    thumbnailUrl: number
    size: number
    duration: number
    mimeType: number
    resolution: number
    status: number
    userId: number
    description: number
    likesCount: number
    commentsCount: number
    publishedAt: number
    processedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VideoAvgAggregateInputType = {
    size?: true
    duration?: true
    likesCount?: true
    commentsCount?: true
  }

  export type VideoSumAggregateInputType = {
    size?: true
    duration?: true
    likesCount?: true
    commentsCount?: true
  }

  export type VideoMinAggregateInputType = {
    id?: true
    originalName?: true
    fileName?: true
    s3Key?: true
    url?: true
    cdnUrl?: true
    thumbnailUrl?: true
    size?: true
    duration?: true
    mimeType?: true
    resolution?: true
    status?: true
    userId?: true
    description?: true
    likesCount?: true
    commentsCount?: true
    publishedAt?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoMaxAggregateInputType = {
    id?: true
    originalName?: true
    fileName?: true
    s3Key?: true
    url?: true
    cdnUrl?: true
    thumbnailUrl?: true
    size?: true
    duration?: true
    mimeType?: true
    resolution?: true
    status?: true
    userId?: true
    description?: true
    likesCount?: true
    commentsCount?: true
    publishedAt?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoCountAggregateInputType = {
    id?: true
    originalName?: true
    fileName?: true
    s3Key?: true
    url?: true
    cdnUrl?: true
    thumbnailUrl?: true
    size?: true
    duration?: true
    mimeType?: true
    resolution?: true
    status?: true
    userId?: true
    description?: true
    likesCount?: true
    commentsCount?: true
    publishedAt?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Video to aggregate.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Videos
    **/
    _count?: true | VideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoMaxAggregateInputType
  }

  export type GetVideoAggregateType<T extends VideoAggregateArgs> = {
        [P in keyof T & keyof AggregateVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideo[P]>
      : GetScalarType<T[P], AggregateVideo[P]>
  }




  export type VideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithAggregationInput | VideoOrderByWithAggregationInput[]
    by: VideoScalarFieldEnum[] | VideoScalarFieldEnum
    having?: VideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoCountAggregateInputType | true
    _avg?: VideoAvgAggregateInputType
    _sum?: VideoSumAggregateInputType
    _min?: VideoMinAggregateInputType
    _max?: VideoMaxAggregateInputType
  }

  export type VideoGroupByOutputType = {
    id: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl: string
    thumbnailUrl: string | null
    size: number
    duration: number | null
    mimeType: string
    resolution: string | null
    status: $Enums.VideoStatus
    userId: string
    description: string
    likesCount: number
    commentsCount: number
    publishedAt: Date | null
    processedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: VideoCountAggregateOutputType | null
    _avg: VideoAvgAggregateOutputType | null
    _sum: VideoSumAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  }

  type GetVideoGroupByPayload<T extends VideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoGroupByOutputType[P]>
            : GetScalarType<T[P], VideoGroupByOutputType[P]>
        }
      >
    >


  export type VideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    fileName?: boolean
    s3Key?: boolean
    url?: boolean
    cdnUrl?: boolean
    thumbnailUrl?: boolean
    size?: boolean
    duration?: boolean
    mimeType?: boolean
    resolution?: boolean
    status?: boolean
    userId?: boolean
    description?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    publishedAt?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    likes?: boolean | Video$likesArgs<ExtArgs>
    comments?: boolean | Video$commentsArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>

  export type VideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    fileName?: boolean
    s3Key?: boolean
    url?: boolean
    cdnUrl?: boolean
    thumbnailUrl?: boolean
    size?: boolean
    duration?: boolean
    mimeType?: boolean
    resolution?: boolean
    status?: boolean
    userId?: boolean
    description?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    publishedAt?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>

  export type VideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    fileName?: boolean
    s3Key?: boolean
    url?: boolean
    cdnUrl?: boolean
    thumbnailUrl?: boolean
    size?: boolean
    duration?: boolean
    mimeType?: boolean
    resolution?: boolean
    status?: boolean
    userId?: boolean
    description?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    publishedAt?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>

  export type VideoSelectScalar = {
    id?: boolean
    originalName?: boolean
    fileName?: boolean
    s3Key?: boolean
    url?: boolean
    cdnUrl?: boolean
    thumbnailUrl?: boolean
    size?: boolean
    duration?: boolean
    mimeType?: boolean
    resolution?: boolean
    status?: boolean
    userId?: boolean
    description?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    publishedAt?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "originalName" | "fileName" | "s3Key" | "url" | "cdnUrl" | "thumbnailUrl" | "size" | "duration" | "mimeType" | "resolution" | "status" | "userId" | "description" | "likesCount" | "commentsCount" | "publishedAt" | "processedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["video"]>
  export type VideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    likes?: boolean | Video$likesArgs<ExtArgs>
    comments?: boolean | Video$commentsArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Video"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      likes: Prisma.$VideoLikePayload<ExtArgs>[]
      comments: Prisma.$VideoCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      originalName: string
      fileName: string
      s3Key: string
      url: string
      cdnUrl: string
      thumbnailUrl: string | null
      size: number
      duration: number | null
      mimeType: string
      resolution: string | null
      status: $Enums.VideoStatus
      userId: string
      description: string
      likesCount: number
      commentsCount: number
      publishedAt: Date | null
      processedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["video"]>
    composites: {}
  }

  type VideoGetPayload<S extends boolean | null | undefined | VideoDefaultArgs> = $Result.GetResult<Prisma.$VideoPayload, S>

  type VideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoCountAggregateInputType | true
    }

  export interface VideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Video'], meta: { name: 'Video' } }
    /**
     * Find zero or one Video that matches the filter.
     * @param {VideoFindUniqueArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoFindUniqueArgs>(args: SelectSubset<T, VideoFindUniqueArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Video that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoFindUniqueOrThrowArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Video that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindFirstArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoFindFirstArgs>(args?: SelectSubset<T, VideoFindFirstArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Video that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindFirstOrThrowArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Videos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Videos
     * const videos = await prisma.video.findMany()
     * 
     * // Get first 10 Videos
     * const videos = await prisma.video.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoWithIdOnly = await prisma.video.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoFindManyArgs>(args?: SelectSubset<T, VideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Video.
     * @param {VideoCreateArgs} args - Arguments to create a Video.
     * @example
     * // Create one Video
     * const Video = await prisma.video.create({
     *   data: {
     *     // ... data to create a Video
     *   }
     * })
     * 
     */
    create<T extends VideoCreateArgs>(args: SelectSubset<T, VideoCreateArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Videos.
     * @param {VideoCreateManyArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const video = await prisma.video.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoCreateManyArgs>(args?: SelectSubset<T, VideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Videos and returns the data saved in the database.
     * @param {VideoCreateManyAndReturnArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const video = await prisma.video.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Videos and only return the `id`
     * const videoWithIdOnly = await prisma.video.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Video.
     * @param {VideoDeleteArgs} args - Arguments to delete one Video.
     * @example
     * // Delete one Video
     * const Video = await prisma.video.delete({
     *   where: {
     *     // ... filter to delete one Video
     *   }
     * })
     * 
     */
    delete<T extends VideoDeleteArgs>(args: SelectSubset<T, VideoDeleteArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Video.
     * @param {VideoUpdateArgs} args - Arguments to update one Video.
     * @example
     * // Update one Video
     * const video = await prisma.video.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoUpdateArgs>(args: SelectSubset<T, VideoUpdateArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Videos.
     * @param {VideoDeleteManyArgs} args - Arguments to filter Videos to delete.
     * @example
     * // Delete a few Videos
     * const { count } = await prisma.video.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoDeleteManyArgs>(args?: SelectSubset<T, VideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Videos
     * const video = await prisma.video.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoUpdateManyArgs>(args: SelectSubset<T, VideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos and returns the data updated in the database.
     * @param {VideoUpdateManyAndReturnArgs} args - Arguments to update many Videos.
     * @example
     * // Update many Videos
     * const video = await prisma.video.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Videos and only return the `id`
     * const videoWithIdOnly = await prisma.video.updateManyAndReturn({
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
    updateManyAndReturn<T extends VideoUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Video.
     * @param {VideoUpsertArgs} args - Arguments to update or create a Video.
     * @example
     * // Update or create a Video
     * const video = await prisma.video.upsert({
     *   create: {
     *     // ... data to create a Video
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Video we want to update
     *   }
     * })
     */
    upsert<T extends VideoUpsertArgs>(args: SelectSubset<T, VideoUpsertArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCountArgs} args - Arguments to filter Videos to count.
     * @example
     * // Count the number of Videos
     * const count = await prisma.video.count({
     *   where: {
     *     // ... the filter for the Videos we want to count
     *   }
     * })
    **/
    count<T extends VideoCountArgs>(
      args?: Subset<T, VideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Video.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VideoAggregateArgs>(args: Subset<T, VideoAggregateArgs>): Prisma.PrismaPromise<GetVideoAggregateType<T>>

    /**
     * Group by Video.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoGroupByArgs} args - Group by arguments.
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
      T extends VideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoGroupByArgs['orderBy'] }
        : { orderBy?: VideoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Video model
   */
  readonly fields: VideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Video.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    likes<T extends Video$likesArgs<ExtArgs> = {}>(args?: Subset<T, Video$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Video$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Video$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Video model
   */
  interface VideoFieldRefs {
    readonly id: FieldRef<"Video", 'String'>
    readonly originalName: FieldRef<"Video", 'String'>
    readonly fileName: FieldRef<"Video", 'String'>
    readonly s3Key: FieldRef<"Video", 'String'>
    readonly url: FieldRef<"Video", 'String'>
    readonly cdnUrl: FieldRef<"Video", 'String'>
    readonly thumbnailUrl: FieldRef<"Video", 'String'>
    readonly size: FieldRef<"Video", 'Int'>
    readonly duration: FieldRef<"Video", 'Int'>
    readonly mimeType: FieldRef<"Video", 'String'>
    readonly resolution: FieldRef<"Video", 'String'>
    readonly status: FieldRef<"Video", 'VideoStatus'>
    readonly userId: FieldRef<"Video", 'String'>
    readonly description: FieldRef<"Video", 'String'>
    readonly likesCount: FieldRef<"Video", 'Int'>
    readonly commentsCount: FieldRef<"Video", 'Int'>
    readonly publishedAt: FieldRef<"Video", 'DateTime'>
    readonly processedAt: FieldRef<"Video", 'DateTime'>
    readonly createdAt: FieldRef<"Video", 'DateTime'>
    readonly updatedAt: FieldRef<"Video", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Video findUnique
   */
  export type VideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video findUniqueOrThrow
   */
  export type VideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video findFirst
   */
  export type VideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video findFirstOrThrow
   */
  export type VideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video findMany
   */
  export type VideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Videos to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video create
   */
  export type VideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The data needed to create a Video.
     */
    data: XOR<VideoCreateInput, VideoUncheckedCreateInput>
  }

  /**
   * Video createMany
   */
  export type VideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Videos.
     */
    data: VideoCreateManyInput | VideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Video createManyAndReturn
   */
  export type VideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * The data used to create many Videos.
     */
    data: VideoCreateManyInput | VideoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Video update
   */
  export type VideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The data needed to update a Video.
     */
    data: XOR<VideoUpdateInput, VideoUncheckedUpdateInput>
    /**
     * Choose, which Video to update.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video updateMany
   */
  export type VideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Videos.
     */
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyInput>
    /**
     * Filter which Videos to update
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to update.
     */
    limit?: number
  }

  /**
   * Video updateManyAndReturn
   */
  export type VideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * The data used to update Videos.
     */
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyInput>
    /**
     * Filter which Videos to update
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Video upsert
   */
  export type VideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The filter to search for the Video to update in case it exists.
     */
    where: VideoWhereUniqueInput
    /**
     * In case the Video found by the `where` argument doesn't exist, create a new Video with this data.
     */
    create: XOR<VideoCreateInput, VideoUncheckedCreateInput>
    /**
     * In case the Video was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoUpdateInput, VideoUncheckedUpdateInput>
  }

  /**
   * Video delete
   */
  export type VideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter which Video to delete.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video deleteMany
   */
  export type VideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Videos to delete
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to delete.
     */
    limit?: number
  }

  /**
   * Video.likes
   */
  export type Video$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoLike
     */
    select?: VideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoLike
     */
    omit?: VideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
    where?: VideoLikeWhereInput
    orderBy?: VideoLikeOrderByWithRelationInput | VideoLikeOrderByWithRelationInput[]
    cursor?: VideoLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoLikeScalarFieldEnum | VideoLikeScalarFieldEnum[]
  }

  /**
   * Video.comments
   */
  export type Video$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
    where?: VideoCommentWhereInput
    orderBy?: VideoCommentOrderByWithRelationInput | VideoCommentOrderByWithRelationInput[]
    cursor?: VideoCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoCommentScalarFieldEnum | VideoCommentScalarFieldEnum[]
  }

  /**
   * Video without action
   */
  export type VideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
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
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoLike"]>

  export type VideoLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    createdAt?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoLike"]>

  export type VideoLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    createdAt?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoLike"]>

  export type VideoLikeSelectScalar = {
    id?: boolean
    videoId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type VideoLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "videoId" | "userId" | "createdAt", ExtArgs["result"]["videoLike"]>
  export type VideoLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VideoLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VideoLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VideoLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoLike"
    objects: {
      video: Prisma.$VideoPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
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
    video<T extends VideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VideoDefaultArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeIncludeCreateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeIncludeUpdateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoLikeInclude<ExtArgs> | null
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
    parent?: boolean | VideoComment$parentArgs<ExtArgs>
    replies?: boolean | VideoComment$repliesArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | VideoCommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoComment"]>

  export type VideoCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    parentId?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | VideoComment$parentArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoComment"]>

  export type VideoCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    userId?: boolean
    parentId?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | VideoComment$parentArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
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
  export type VideoCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | VideoComment$parentArgs<ExtArgs>
    replies?: boolean | VideoComment$repliesArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | VideoCommentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VideoCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | VideoComment$parentArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VideoCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | VideoComment$parentArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VideoCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoComment"
    objects: {
      parent: Prisma.$VideoCommentPayload<ExtArgs> | null
      replies: Prisma.$VideoCommentPayload<ExtArgs>[]
      video: Prisma.$VideoPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
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
    parent<T extends VideoComment$parentArgs<ExtArgs> = {}>(args?: Subset<T, VideoComment$parentArgs<ExtArgs>>): Prisma__VideoCommentClient<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    replies<T extends VideoComment$repliesArgs<ExtArgs> = {}>(args?: Subset<T, VideoComment$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    video<T extends VideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VideoDefaultArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentIncludeCreateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentIncludeUpdateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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
   * VideoComment.parent
   */
  export type VideoComment$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
    where?: VideoCommentWhereInput
  }

  /**
   * VideoComment.replies
   */
  export type VideoComment$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoComment
     */
    select?: VideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoComment
     */
    omit?: VideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
    where?: VideoCommentWhereInput
    orderBy?: VideoCommentOrderByWithRelationInput | VideoCommentOrderByWithRelationInput[]
    cursor?: VideoCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoCommentScalarFieldEnum | VideoCommentScalarFieldEnum[]
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoCommentInclude<ExtArgs> | null
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


  export const VideoScalarFieldEnum: {
    id: 'id',
    originalName: 'originalName',
    fileName: 'fileName',
    s3Key: 's3Key',
    url: 'url',
    cdnUrl: 'cdnUrl',
    thumbnailUrl: 'thumbnailUrl',
    size: 'size',
    duration: 'duration',
    mimeType: 'mimeType',
    resolution: 'resolution',
    status: 'status',
    userId: 'userId',
    description: 'description',
    likesCount: 'likesCount',
    commentsCount: 'commentsCount',
    publishedAt: 'publishedAt',
    processedAt: 'processedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VideoScalarFieldEnum = (typeof VideoScalarFieldEnum)[keyof typeof VideoScalarFieldEnum]


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
   * Reference to a field of type 'VideoStatus'
   */
  export type EnumVideoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoStatus'>
    


  /**
   * Reference to a field of type 'VideoStatus[]'
   */
  export type ListEnumVideoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoStatus[]'>
    


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
    videos?: VideoListRelationFilter
    likes?: VideoLikeListRelationFilter
    comments?: VideoCommentListRelationFilter
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
    videos?: VideoOrderByRelationAggregateInput
    likes?: VideoLikeOrderByRelationAggregateInput
    comments?: VideoCommentOrderByRelationAggregateInput
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
    videos?: VideoListRelationFilter
    likes?: VideoLikeListRelationFilter
    comments?: VideoCommentListRelationFilter
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

  export type VideoWhereInput = {
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    id?: StringFilter<"Video"> | string
    originalName?: StringFilter<"Video"> | string
    fileName?: StringFilter<"Video"> | string
    s3Key?: StringFilter<"Video"> | string
    url?: StringFilter<"Video"> | string
    cdnUrl?: StringFilter<"Video"> | string
    thumbnailUrl?: StringNullableFilter<"Video"> | string | null
    size?: IntFilter<"Video"> | number
    duration?: IntNullableFilter<"Video"> | number | null
    mimeType?: StringFilter<"Video"> | string
    resolution?: StringNullableFilter<"Video"> | string | null
    status?: EnumVideoStatusFilter<"Video"> | $Enums.VideoStatus
    userId?: StringFilter<"Video"> | string
    description?: StringFilter<"Video"> | string
    likesCount?: IntFilter<"Video"> | number
    commentsCount?: IntFilter<"Video"> | number
    publishedAt?: DateTimeNullableFilter<"Video"> | Date | string | null
    processedAt?: DateTimeNullableFilter<"Video"> | Date | string | null
    createdAt?: DateTimeFilter<"Video"> | Date | string
    updatedAt?: DateTimeFilter<"Video"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    likes?: VideoLikeListRelationFilter
    comments?: VideoCommentListRelationFilter
  }

  export type VideoOrderByWithRelationInput = {
    id?: SortOrder
    originalName?: SortOrder
    fileName?: SortOrder
    s3Key?: SortOrder
    url?: SortOrder
    cdnUrl?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    size?: SortOrder
    duration?: SortOrderInput | SortOrder
    mimeType?: SortOrder
    resolution?: SortOrderInput | SortOrder
    status?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    likes?: VideoLikeOrderByRelationAggregateInput
    comments?: VideoCommentOrderByRelationAggregateInput
  }

  export type VideoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fileName?: string
    s3Key?: string
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    originalName?: StringFilter<"Video"> | string
    url?: StringFilter<"Video"> | string
    cdnUrl?: StringFilter<"Video"> | string
    thumbnailUrl?: StringNullableFilter<"Video"> | string | null
    size?: IntFilter<"Video"> | number
    duration?: IntNullableFilter<"Video"> | number | null
    mimeType?: StringFilter<"Video"> | string
    resolution?: StringNullableFilter<"Video"> | string | null
    status?: EnumVideoStatusFilter<"Video"> | $Enums.VideoStatus
    userId?: StringFilter<"Video"> | string
    description?: StringFilter<"Video"> | string
    likesCount?: IntFilter<"Video"> | number
    commentsCount?: IntFilter<"Video"> | number
    publishedAt?: DateTimeNullableFilter<"Video"> | Date | string | null
    processedAt?: DateTimeNullableFilter<"Video"> | Date | string | null
    createdAt?: DateTimeFilter<"Video"> | Date | string
    updatedAt?: DateTimeFilter<"Video"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    likes?: VideoLikeListRelationFilter
    comments?: VideoCommentListRelationFilter
  }, "id" | "fileName" | "s3Key">

  export type VideoOrderByWithAggregationInput = {
    id?: SortOrder
    originalName?: SortOrder
    fileName?: SortOrder
    s3Key?: SortOrder
    url?: SortOrder
    cdnUrl?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    size?: SortOrder
    duration?: SortOrderInput | SortOrder
    mimeType?: SortOrder
    resolution?: SortOrderInput | SortOrder
    status?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VideoCountOrderByAggregateInput
    _avg?: VideoAvgOrderByAggregateInput
    _max?: VideoMaxOrderByAggregateInput
    _min?: VideoMinOrderByAggregateInput
    _sum?: VideoSumOrderByAggregateInput
  }

  export type VideoScalarWhereWithAggregatesInput = {
    AND?: VideoScalarWhereWithAggregatesInput | VideoScalarWhereWithAggregatesInput[]
    OR?: VideoScalarWhereWithAggregatesInput[]
    NOT?: VideoScalarWhereWithAggregatesInput | VideoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Video"> | string
    originalName?: StringWithAggregatesFilter<"Video"> | string
    fileName?: StringWithAggregatesFilter<"Video"> | string
    s3Key?: StringWithAggregatesFilter<"Video"> | string
    url?: StringWithAggregatesFilter<"Video"> | string
    cdnUrl?: StringWithAggregatesFilter<"Video"> | string
    thumbnailUrl?: StringNullableWithAggregatesFilter<"Video"> | string | null
    size?: IntWithAggregatesFilter<"Video"> | number
    duration?: IntNullableWithAggregatesFilter<"Video"> | number | null
    mimeType?: StringWithAggregatesFilter<"Video"> | string
    resolution?: StringNullableWithAggregatesFilter<"Video"> | string | null
    status?: EnumVideoStatusWithAggregatesFilter<"Video"> | $Enums.VideoStatus
    userId?: StringWithAggregatesFilter<"Video"> | string
    description?: StringWithAggregatesFilter<"Video"> | string
    likesCount?: IntWithAggregatesFilter<"Video"> | number
    commentsCount?: IntWithAggregatesFilter<"Video"> | number
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Video"> | Date | string | null
    processedAt?: DateTimeNullableWithAggregatesFilter<"Video"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Video"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Video"> | Date | string
  }

  export type VideoLikeWhereInput = {
    AND?: VideoLikeWhereInput | VideoLikeWhereInput[]
    OR?: VideoLikeWhereInput[]
    NOT?: VideoLikeWhereInput | VideoLikeWhereInput[]
    id?: StringFilter<"VideoLike"> | string
    videoId?: StringFilter<"VideoLike"> | string
    userId?: StringFilter<"VideoLike"> | string
    createdAt?: DateTimeFilter<"VideoLike"> | Date | string
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VideoLikeOrderByWithRelationInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    video?: VideoOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
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
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
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
    parent?: XOR<VideoCommentNullableScalarRelationFilter, VideoCommentWhereInput> | null
    replies?: VideoCommentListRelationFilter
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VideoCommentOrderByWithRelationInput = {
    id?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: VideoCommentOrderByWithRelationInput
    replies?: VideoCommentOrderByRelationAggregateInput
    video?: VideoOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
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
    parent?: XOR<VideoCommentNullableScalarRelationFilter, VideoCommentWhereInput> | null
    replies?: VideoCommentListRelationFilter
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
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
    password: string
    phone: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: VideoCreateNestedManyWithoutUserInput
    likes?: VideoLikeCreateNestedManyWithoutUserInput
    comments?: VideoCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    phone: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: VideoUncheckedCreateNestedManyWithoutUserInput
    likes?: VideoLikeUncheckedCreateNestedManyWithoutUserInput
    comments?: VideoCommentUncheckedCreateNestedManyWithoutUserInput
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
    videos?: VideoUpdateManyWithoutUserNestedInput
    likes?: VideoLikeUpdateManyWithoutUserNestedInput
    comments?: VideoCommentUpdateManyWithoutUserNestedInput
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
    videos?: VideoUncheckedUpdateManyWithoutUserNestedInput
    likes?: VideoLikeUncheckedUpdateManyWithoutUserNestedInput
    comments?: VideoCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    phone: string
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

  export type VideoCreateInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVideosInput
    likes?: VideoLikeCreateNestedManyWithoutVideoInput
    comments?: VideoCommentCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    userId: string
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: VideoLikeUncheckedCreateNestedManyWithoutVideoInput
    comments?: VideoCommentUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVideosNestedInput
    likes?: VideoLikeUpdateManyWithoutVideoNestedInput
    comments?: VideoCommentUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    userId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: VideoLikeUncheckedUpdateManyWithoutVideoNestedInput
    comments?: VideoCommentUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type VideoCreateManyInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    userId: string
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    userId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeCreateInput = {
    id?: string
    createdAt?: Date | string
    video: VideoCreateNestedOneWithoutLikesInput
    user: UserCreateNestedOneWithoutLikesInput
  }

  export type VideoLikeUncheckedCreateInput = {
    id?: string
    videoId: string
    userId: string
    createdAt?: Date | string
  }

  export type VideoLikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: VideoUpdateOneRequiredWithoutLikesNestedInput
    user?: UserUpdateOneRequiredWithoutLikesNestedInput
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
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: VideoCommentCreateNestedOneWithoutRepliesInput
    replies?: VideoCommentCreateNestedManyWithoutParentInput
    video: VideoCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type VideoCommentUncheckedCreateInput = {
    id?: string
    videoId: string
    userId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: VideoCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type VideoCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: VideoCommentUpdateOneWithoutRepliesNestedInput
    replies?: VideoCommentUpdateManyWithoutParentNestedInput
    video?: VideoUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type VideoCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: VideoCommentUncheckedUpdateManyWithoutParentNestedInput
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

  export type VideoListRelationFilter = {
    every?: VideoWhereInput
    some?: VideoWhereInput
    none?: VideoWhereInput
  }

  export type VideoLikeListRelationFilter = {
    every?: VideoLikeWhereInput
    some?: VideoLikeWhereInput
    none?: VideoLikeWhereInput
  }

  export type VideoCommentListRelationFilter = {
    every?: VideoCommentWhereInput
    some?: VideoCommentWhereInput
    none?: VideoCommentWhereInput
  }

  export type VideoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VideoLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VideoCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
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

  export type EnumVideoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusFilter<$PrismaModel> | $Enums.VideoStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VideoCountOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    fileName?: SortOrder
    s3Key?: SortOrder
    url?: SortOrder
    cdnUrl?: SortOrder
    thumbnailUrl?: SortOrder
    size?: SortOrder
    duration?: SortOrder
    mimeType?: SortOrder
    resolution?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    publishedAt?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoAvgOrderByAggregateInput = {
    size?: SortOrder
    duration?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
  }

  export type VideoMaxOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    fileName?: SortOrder
    s3Key?: SortOrder
    url?: SortOrder
    cdnUrl?: SortOrder
    thumbnailUrl?: SortOrder
    size?: SortOrder
    duration?: SortOrder
    mimeType?: SortOrder
    resolution?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    publishedAt?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoMinOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    fileName?: SortOrder
    s3Key?: SortOrder
    url?: SortOrder
    cdnUrl?: SortOrder
    thumbnailUrl?: SortOrder
    size?: SortOrder
    duration?: SortOrder
    mimeType?: SortOrder
    resolution?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    description?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    publishedAt?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoSumOrderByAggregateInput = {
    size?: SortOrder
    duration?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
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

  export type EnumVideoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel> | $Enums.VideoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoStatusFilter<$PrismaModel>
    _max?: NestedEnumVideoStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VideoScalarRelationFilter = {
    is?: VideoWhereInput
    isNot?: VideoWhereInput
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

  export type VideoCommentNullableScalarRelationFilter = {
    is?: VideoCommentWhereInput | null
    isNot?: VideoCommentWhereInput | null
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

  export type VideoCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoCreateWithoutUserInput, VideoUncheckedCreateWithoutUserInput> | VideoCreateWithoutUserInput[] | VideoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoCreateOrConnectWithoutUserInput | VideoCreateOrConnectWithoutUserInput[]
    createMany?: VideoCreateManyUserInputEnvelope
    connect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
  }

  export type VideoLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoLikeCreateWithoutUserInput, VideoLikeUncheckedCreateWithoutUserInput> | VideoLikeCreateWithoutUserInput[] | VideoLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoLikeCreateOrConnectWithoutUserInput | VideoLikeCreateOrConnectWithoutUserInput[]
    createMany?: VideoLikeCreateManyUserInputEnvelope
    connect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
  }

  export type VideoCommentCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoCommentCreateWithoutUserInput, VideoCommentUncheckedCreateWithoutUserInput> | VideoCommentCreateWithoutUserInput[] | VideoCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutUserInput | VideoCommentCreateOrConnectWithoutUserInput[]
    createMany?: VideoCommentCreateManyUserInputEnvelope
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
  }

  export type VideoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoCreateWithoutUserInput, VideoUncheckedCreateWithoutUserInput> | VideoCreateWithoutUserInput[] | VideoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoCreateOrConnectWithoutUserInput | VideoCreateOrConnectWithoutUserInput[]
    createMany?: VideoCreateManyUserInputEnvelope
    connect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
  }

  export type VideoLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoLikeCreateWithoutUserInput, VideoLikeUncheckedCreateWithoutUserInput> | VideoLikeCreateWithoutUserInput[] | VideoLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoLikeCreateOrConnectWithoutUserInput | VideoLikeCreateOrConnectWithoutUserInput[]
    createMany?: VideoLikeCreateManyUserInputEnvelope
    connect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
  }

  export type VideoCommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoCommentCreateWithoutUserInput, VideoCommentUncheckedCreateWithoutUserInput> | VideoCommentCreateWithoutUserInput[] | VideoCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutUserInput | VideoCommentCreateOrConnectWithoutUserInput[]
    createMany?: VideoCommentCreateManyUserInputEnvelope
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VideoUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoCreateWithoutUserInput, VideoUncheckedCreateWithoutUserInput> | VideoCreateWithoutUserInput[] | VideoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoCreateOrConnectWithoutUserInput | VideoCreateOrConnectWithoutUserInput[]
    upsert?: VideoUpsertWithWhereUniqueWithoutUserInput | VideoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoCreateManyUserInputEnvelope
    set?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    disconnect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    delete?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    connect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    update?: VideoUpdateWithWhereUniqueWithoutUserInput | VideoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoUpdateManyWithWhereWithoutUserInput | VideoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoScalarWhereInput | VideoScalarWhereInput[]
  }

  export type VideoLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoLikeCreateWithoutUserInput, VideoLikeUncheckedCreateWithoutUserInput> | VideoLikeCreateWithoutUserInput[] | VideoLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoLikeCreateOrConnectWithoutUserInput | VideoLikeCreateOrConnectWithoutUserInput[]
    upsert?: VideoLikeUpsertWithWhereUniqueWithoutUserInput | VideoLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoLikeCreateManyUserInputEnvelope
    set?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    disconnect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    delete?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    connect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    update?: VideoLikeUpdateWithWhereUniqueWithoutUserInput | VideoLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoLikeUpdateManyWithWhereWithoutUserInput | VideoLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoLikeScalarWhereInput | VideoLikeScalarWhereInput[]
  }

  export type VideoCommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoCommentCreateWithoutUserInput, VideoCommentUncheckedCreateWithoutUserInput> | VideoCommentCreateWithoutUserInput[] | VideoCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutUserInput | VideoCommentCreateOrConnectWithoutUserInput[]
    upsert?: VideoCommentUpsertWithWhereUniqueWithoutUserInput | VideoCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoCommentCreateManyUserInputEnvelope
    set?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    disconnect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    delete?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    update?: VideoCommentUpdateWithWhereUniqueWithoutUserInput | VideoCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoCommentUpdateManyWithWhereWithoutUserInput | VideoCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoCommentScalarWhereInput | VideoCommentScalarWhereInput[]
  }

  export type VideoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoCreateWithoutUserInput, VideoUncheckedCreateWithoutUserInput> | VideoCreateWithoutUserInput[] | VideoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoCreateOrConnectWithoutUserInput | VideoCreateOrConnectWithoutUserInput[]
    upsert?: VideoUpsertWithWhereUniqueWithoutUserInput | VideoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoCreateManyUserInputEnvelope
    set?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    disconnect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    delete?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    connect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    update?: VideoUpdateWithWhereUniqueWithoutUserInput | VideoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoUpdateManyWithWhereWithoutUserInput | VideoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoScalarWhereInput | VideoScalarWhereInput[]
  }

  export type VideoLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoLikeCreateWithoutUserInput, VideoLikeUncheckedCreateWithoutUserInput> | VideoLikeCreateWithoutUserInput[] | VideoLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoLikeCreateOrConnectWithoutUserInput | VideoLikeCreateOrConnectWithoutUserInput[]
    upsert?: VideoLikeUpsertWithWhereUniqueWithoutUserInput | VideoLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoLikeCreateManyUserInputEnvelope
    set?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    disconnect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    delete?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    connect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    update?: VideoLikeUpdateWithWhereUniqueWithoutUserInput | VideoLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoLikeUpdateManyWithWhereWithoutUserInput | VideoLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoLikeScalarWhereInput | VideoLikeScalarWhereInput[]
  }

  export type VideoCommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoCommentCreateWithoutUserInput, VideoCommentUncheckedCreateWithoutUserInput> | VideoCommentCreateWithoutUserInput[] | VideoCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutUserInput | VideoCommentCreateOrConnectWithoutUserInput[]
    upsert?: VideoCommentUpsertWithWhereUniqueWithoutUserInput | VideoCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoCommentCreateManyUserInputEnvelope
    set?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    disconnect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    delete?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    update?: VideoCommentUpdateWithWhereUniqueWithoutUserInput | VideoCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoCommentUpdateManyWithWhereWithoutUserInput | VideoCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoCommentScalarWhereInput | VideoCommentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutVideosInput = {
    create?: XOR<UserCreateWithoutVideosInput, UserUncheckedCreateWithoutVideosInput>
    connectOrCreate?: UserCreateOrConnectWithoutVideosInput
    connect?: UserWhereUniqueInput
  }

  export type VideoLikeCreateNestedManyWithoutVideoInput = {
    create?: XOR<VideoLikeCreateWithoutVideoInput, VideoLikeUncheckedCreateWithoutVideoInput> | VideoLikeCreateWithoutVideoInput[] | VideoLikeUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoLikeCreateOrConnectWithoutVideoInput | VideoLikeCreateOrConnectWithoutVideoInput[]
    createMany?: VideoLikeCreateManyVideoInputEnvelope
    connect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
  }

  export type VideoCommentCreateNestedManyWithoutVideoInput = {
    create?: XOR<VideoCommentCreateWithoutVideoInput, VideoCommentUncheckedCreateWithoutVideoInput> | VideoCommentCreateWithoutVideoInput[] | VideoCommentUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutVideoInput | VideoCommentCreateOrConnectWithoutVideoInput[]
    createMany?: VideoCommentCreateManyVideoInputEnvelope
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
  }

  export type VideoLikeUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<VideoLikeCreateWithoutVideoInput, VideoLikeUncheckedCreateWithoutVideoInput> | VideoLikeCreateWithoutVideoInput[] | VideoLikeUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoLikeCreateOrConnectWithoutVideoInput | VideoLikeCreateOrConnectWithoutVideoInput[]
    createMany?: VideoLikeCreateManyVideoInputEnvelope
    connect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
  }

  export type VideoCommentUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<VideoCommentCreateWithoutVideoInput, VideoCommentUncheckedCreateWithoutVideoInput> | VideoCommentCreateWithoutVideoInput[] | VideoCommentUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutVideoInput | VideoCommentCreateOrConnectWithoutVideoInput[]
    createMany?: VideoCommentCreateManyVideoInputEnvelope
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumVideoStatusFieldUpdateOperationsInput = {
    set?: $Enums.VideoStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutVideosNestedInput = {
    create?: XOR<UserCreateWithoutVideosInput, UserUncheckedCreateWithoutVideosInput>
    connectOrCreate?: UserCreateOrConnectWithoutVideosInput
    upsert?: UserUpsertWithoutVideosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVideosInput, UserUpdateWithoutVideosInput>, UserUncheckedUpdateWithoutVideosInput>
  }

  export type VideoLikeUpdateManyWithoutVideoNestedInput = {
    create?: XOR<VideoLikeCreateWithoutVideoInput, VideoLikeUncheckedCreateWithoutVideoInput> | VideoLikeCreateWithoutVideoInput[] | VideoLikeUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoLikeCreateOrConnectWithoutVideoInput | VideoLikeCreateOrConnectWithoutVideoInput[]
    upsert?: VideoLikeUpsertWithWhereUniqueWithoutVideoInput | VideoLikeUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: VideoLikeCreateManyVideoInputEnvelope
    set?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    disconnect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    delete?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    connect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    update?: VideoLikeUpdateWithWhereUniqueWithoutVideoInput | VideoLikeUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: VideoLikeUpdateManyWithWhereWithoutVideoInput | VideoLikeUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: VideoLikeScalarWhereInput | VideoLikeScalarWhereInput[]
  }

  export type VideoCommentUpdateManyWithoutVideoNestedInput = {
    create?: XOR<VideoCommentCreateWithoutVideoInput, VideoCommentUncheckedCreateWithoutVideoInput> | VideoCommentCreateWithoutVideoInput[] | VideoCommentUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutVideoInput | VideoCommentCreateOrConnectWithoutVideoInput[]
    upsert?: VideoCommentUpsertWithWhereUniqueWithoutVideoInput | VideoCommentUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: VideoCommentCreateManyVideoInputEnvelope
    set?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    disconnect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    delete?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    update?: VideoCommentUpdateWithWhereUniqueWithoutVideoInput | VideoCommentUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: VideoCommentUpdateManyWithWhereWithoutVideoInput | VideoCommentUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: VideoCommentScalarWhereInput | VideoCommentScalarWhereInput[]
  }

  export type VideoLikeUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<VideoLikeCreateWithoutVideoInput, VideoLikeUncheckedCreateWithoutVideoInput> | VideoLikeCreateWithoutVideoInput[] | VideoLikeUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoLikeCreateOrConnectWithoutVideoInput | VideoLikeCreateOrConnectWithoutVideoInput[]
    upsert?: VideoLikeUpsertWithWhereUniqueWithoutVideoInput | VideoLikeUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: VideoLikeCreateManyVideoInputEnvelope
    set?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    disconnect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    delete?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    connect?: VideoLikeWhereUniqueInput | VideoLikeWhereUniqueInput[]
    update?: VideoLikeUpdateWithWhereUniqueWithoutVideoInput | VideoLikeUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: VideoLikeUpdateManyWithWhereWithoutVideoInput | VideoLikeUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: VideoLikeScalarWhereInput | VideoLikeScalarWhereInput[]
  }

  export type VideoCommentUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<VideoCommentCreateWithoutVideoInput, VideoCommentUncheckedCreateWithoutVideoInput> | VideoCommentCreateWithoutVideoInput[] | VideoCommentUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutVideoInput | VideoCommentCreateOrConnectWithoutVideoInput[]
    upsert?: VideoCommentUpsertWithWhereUniqueWithoutVideoInput | VideoCommentUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: VideoCommentCreateManyVideoInputEnvelope
    set?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    disconnect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    delete?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    update?: VideoCommentUpdateWithWhereUniqueWithoutVideoInput | VideoCommentUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: VideoCommentUpdateManyWithWhereWithoutVideoInput | VideoCommentUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: VideoCommentScalarWhereInput | VideoCommentScalarWhereInput[]
  }

  export type VideoCreateNestedOneWithoutLikesInput = {
    create?: XOR<VideoCreateWithoutLikesInput, VideoUncheckedCreateWithoutLikesInput>
    connectOrCreate?: VideoCreateOrConnectWithoutLikesInput
    connect?: VideoWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLikesInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    connect?: UserWhereUniqueInput
  }

  export type VideoUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<VideoCreateWithoutLikesInput, VideoUncheckedCreateWithoutLikesInput>
    connectOrCreate?: VideoCreateOrConnectWithoutLikesInput
    upsert?: VideoUpsertWithoutLikesInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutLikesInput, VideoUpdateWithoutLikesInput>, VideoUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    upsert?: UserUpsertWithoutLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikesInput, UserUpdateWithoutLikesInput>, UserUncheckedUpdateWithoutLikesInput>
  }

  export type VideoCommentCreateNestedOneWithoutRepliesInput = {
    create?: XOR<VideoCommentCreateWithoutRepliesInput, VideoCommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: VideoCommentCreateOrConnectWithoutRepliesInput
    connect?: VideoCommentWhereUniqueInput
  }

  export type VideoCommentCreateNestedManyWithoutParentInput = {
    create?: XOR<VideoCommentCreateWithoutParentInput, VideoCommentUncheckedCreateWithoutParentInput> | VideoCommentCreateWithoutParentInput[] | VideoCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutParentInput | VideoCommentCreateOrConnectWithoutParentInput[]
    createMany?: VideoCommentCreateManyParentInputEnvelope
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
  }

  export type VideoCreateNestedOneWithoutCommentsInput = {
    create?: XOR<VideoCreateWithoutCommentsInput, VideoUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: VideoCreateOrConnectWithoutCommentsInput
    connect?: VideoWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type VideoCommentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<VideoCommentCreateWithoutParentInput, VideoCommentUncheckedCreateWithoutParentInput> | VideoCommentCreateWithoutParentInput[] | VideoCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutParentInput | VideoCommentCreateOrConnectWithoutParentInput[]
    createMany?: VideoCommentCreateManyParentInputEnvelope
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
  }

  export type VideoCommentUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<VideoCommentCreateWithoutRepliesInput, VideoCommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: VideoCommentCreateOrConnectWithoutRepliesInput
    upsert?: VideoCommentUpsertWithoutRepliesInput
    disconnect?: VideoCommentWhereInput | boolean
    delete?: VideoCommentWhereInput | boolean
    connect?: VideoCommentWhereUniqueInput
    update?: XOR<XOR<VideoCommentUpdateToOneWithWhereWithoutRepliesInput, VideoCommentUpdateWithoutRepliesInput>, VideoCommentUncheckedUpdateWithoutRepliesInput>
  }

  export type VideoCommentUpdateManyWithoutParentNestedInput = {
    create?: XOR<VideoCommentCreateWithoutParentInput, VideoCommentUncheckedCreateWithoutParentInput> | VideoCommentCreateWithoutParentInput[] | VideoCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutParentInput | VideoCommentCreateOrConnectWithoutParentInput[]
    upsert?: VideoCommentUpsertWithWhereUniqueWithoutParentInput | VideoCommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: VideoCommentCreateManyParentInputEnvelope
    set?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    disconnect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    delete?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    update?: VideoCommentUpdateWithWhereUniqueWithoutParentInput | VideoCommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: VideoCommentUpdateManyWithWhereWithoutParentInput | VideoCommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: VideoCommentScalarWhereInput | VideoCommentScalarWhereInput[]
  }

  export type VideoUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<VideoCreateWithoutCommentsInput, VideoUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: VideoCreateOrConnectWithoutCommentsInput
    upsert?: VideoUpsertWithoutCommentsInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutCommentsInput, VideoUpdateWithoutCommentsInput>, VideoUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type VideoCommentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<VideoCommentCreateWithoutParentInput, VideoCommentUncheckedCreateWithoutParentInput> | VideoCommentCreateWithoutParentInput[] | VideoCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: VideoCommentCreateOrConnectWithoutParentInput | VideoCommentCreateOrConnectWithoutParentInput[]
    upsert?: VideoCommentUpsertWithWhereUniqueWithoutParentInput | VideoCommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: VideoCommentCreateManyParentInputEnvelope
    set?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    disconnect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    delete?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    connect?: VideoCommentWhereUniqueInput | VideoCommentWhereUniqueInput[]
    update?: VideoCommentUpdateWithWhereUniqueWithoutParentInput | VideoCommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: VideoCommentUpdateManyWithWhereWithoutParentInput | VideoCommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: VideoCommentScalarWhereInput | VideoCommentScalarWhereInput[]
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

  export type NestedEnumVideoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusFilter<$PrismaModel> | $Enums.VideoStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel> | $Enums.VideoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoStatusFilter<$PrismaModel>
    _max?: NestedEnumVideoStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VideoCreateWithoutUserInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: VideoLikeCreateNestedManyWithoutVideoInput
    comments?: VideoCommentCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutUserInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: VideoLikeUncheckedCreateNestedManyWithoutVideoInput
    comments?: VideoCommentUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutUserInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutUserInput, VideoUncheckedCreateWithoutUserInput>
  }

  export type VideoCreateManyUserInputEnvelope = {
    data: VideoCreateManyUserInput | VideoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VideoLikeCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    video: VideoCreateNestedOneWithoutLikesInput
  }

  export type VideoLikeUncheckedCreateWithoutUserInput = {
    id?: string
    videoId: string
    createdAt?: Date | string
  }

  export type VideoLikeCreateOrConnectWithoutUserInput = {
    where: VideoLikeWhereUniqueInput
    create: XOR<VideoLikeCreateWithoutUserInput, VideoLikeUncheckedCreateWithoutUserInput>
  }

  export type VideoLikeCreateManyUserInputEnvelope = {
    data: VideoLikeCreateManyUserInput | VideoLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VideoCommentCreateWithoutUserInput = {
    id?: string
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: VideoCommentCreateNestedOneWithoutRepliesInput
    replies?: VideoCommentCreateNestedManyWithoutParentInput
    video: VideoCreateNestedOneWithoutCommentsInput
  }

  export type VideoCommentUncheckedCreateWithoutUserInput = {
    id?: string
    videoId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: VideoCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type VideoCommentCreateOrConnectWithoutUserInput = {
    where: VideoCommentWhereUniqueInput
    create: XOR<VideoCommentCreateWithoutUserInput, VideoCommentUncheckedCreateWithoutUserInput>
  }

  export type VideoCommentCreateManyUserInputEnvelope = {
    data: VideoCommentCreateManyUserInput | VideoCommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VideoUpsertWithWhereUniqueWithoutUserInput = {
    where: VideoWhereUniqueInput
    update: XOR<VideoUpdateWithoutUserInput, VideoUncheckedUpdateWithoutUserInput>
    create: XOR<VideoCreateWithoutUserInput, VideoUncheckedCreateWithoutUserInput>
  }

  export type VideoUpdateWithWhereUniqueWithoutUserInput = {
    where: VideoWhereUniqueInput
    data: XOR<VideoUpdateWithoutUserInput, VideoUncheckedUpdateWithoutUserInput>
  }

  export type VideoUpdateManyWithWhereWithoutUserInput = {
    where: VideoScalarWhereInput
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyWithoutUserInput>
  }

  export type VideoScalarWhereInput = {
    AND?: VideoScalarWhereInput | VideoScalarWhereInput[]
    OR?: VideoScalarWhereInput[]
    NOT?: VideoScalarWhereInput | VideoScalarWhereInput[]
    id?: StringFilter<"Video"> | string
    originalName?: StringFilter<"Video"> | string
    fileName?: StringFilter<"Video"> | string
    s3Key?: StringFilter<"Video"> | string
    url?: StringFilter<"Video"> | string
    cdnUrl?: StringFilter<"Video"> | string
    thumbnailUrl?: StringNullableFilter<"Video"> | string | null
    size?: IntFilter<"Video"> | number
    duration?: IntNullableFilter<"Video"> | number | null
    mimeType?: StringFilter<"Video"> | string
    resolution?: StringNullableFilter<"Video"> | string | null
    status?: EnumVideoStatusFilter<"Video"> | $Enums.VideoStatus
    userId?: StringFilter<"Video"> | string
    description?: StringFilter<"Video"> | string
    likesCount?: IntFilter<"Video"> | number
    commentsCount?: IntFilter<"Video"> | number
    publishedAt?: DateTimeNullableFilter<"Video"> | Date | string | null
    processedAt?: DateTimeNullableFilter<"Video"> | Date | string | null
    createdAt?: DateTimeFilter<"Video"> | Date | string
    updatedAt?: DateTimeFilter<"Video"> | Date | string
  }

  export type VideoLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: VideoLikeWhereUniqueInput
    update: XOR<VideoLikeUpdateWithoutUserInput, VideoLikeUncheckedUpdateWithoutUserInput>
    create: XOR<VideoLikeCreateWithoutUserInput, VideoLikeUncheckedCreateWithoutUserInput>
  }

  export type VideoLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: VideoLikeWhereUniqueInput
    data: XOR<VideoLikeUpdateWithoutUserInput, VideoLikeUncheckedUpdateWithoutUserInput>
  }

  export type VideoLikeUpdateManyWithWhereWithoutUserInput = {
    where: VideoLikeScalarWhereInput
    data: XOR<VideoLikeUpdateManyMutationInput, VideoLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type VideoLikeScalarWhereInput = {
    AND?: VideoLikeScalarWhereInput | VideoLikeScalarWhereInput[]
    OR?: VideoLikeScalarWhereInput[]
    NOT?: VideoLikeScalarWhereInput | VideoLikeScalarWhereInput[]
    id?: StringFilter<"VideoLike"> | string
    videoId?: StringFilter<"VideoLike"> | string
    userId?: StringFilter<"VideoLike"> | string
    createdAt?: DateTimeFilter<"VideoLike"> | Date | string
  }

  export type VideoCommentUpsertWithWhereUniqueWithoutUserInput = {
    where: VideoCommentWhereUniqueInput
    update: XOR<VideoCommentUpdateWithoutUserInput, VideoCommentUncheckedUpdateWithoutUserInput>
    create: XOR<VideoCommentCreateWithoutUserInput, VideoCommentUncheckedCreateWithoutUserInput>
  }

  export type VideoCommentUpdateWithWhereUniqueWithoutUserInput = {
    where: VideoCommentWhereUniqueInput
    data: XOR<VideoCommentUpdateWithoutUserInput, VideoCommentUncheckedUpdateWithoutUserInput>
  }

  export type VideoCommentUpdateManyWithWhereWithoutUserInput = {
    where: VideoCommentScalarWhereInput
    data: XOR<VideoCommentUpdateManyMutationInput, VideoCommentUncheckedUpdateManyWithoutUserInput>
  }

  export type VideoCommentScalarWhereInput = {
    AND?: VideoCommentScalarWhereInput | VideoCommentScalarWhereInput[]
    OR?: VideoCommentScalarWhereInput[]
    NOT?: VideoCommentScalarWhereInput | VideoCommentScalarWhereInput[]
    id?: StringFilter<"VideoComment"> | string
    videoId?: StringFilter<"VideoComment"> | string
    userId?: StringFilter<"VideoComment"> | string
    parentId?: StringNullableFilter<"VideoComment"> | string | null
    text?: StringFilter<"VideoComment"> | string
    createdAt?: DateTimeFilter<"VideoComment"> | Date | string
    updatedAt?: DateTimeFilter<"VideoComment"> | Date | string
  }

  export type UserCreateWithoutVideosInput = {
    id?: string
    email: string
    password: string
    phone: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: VideoLikeCreateNestedManyWithoutUserInput
    comments?: VideoCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVideosInput = {
    id?: string
    email: string
    password: string
    phone: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: VideoLikeUncheckedCreateNestedManyWithoutUserInput
    comments?: VideoCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVideosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVideosInput, UserUncheckedCreateWithoutVideosInput>
  }

  export type VideoLikeCreateWithoutVideoInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLikesInput
  }

  export type VideoLikeUncheckedCreateWithoutVideoInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type VideoLikeCreateOrConnectWithoutVideoInput = {
    where: VideoLikeWhereUniqueInput
    create: XOR<VideoLikeCreateWithoutVideoInput, VideoLikeUncheckedCreateWithoutVideoInput>
  }

  export type VideoLikeCreateManyVideoInputEnvelope = {
    data: VideoLikeCreateManyVideoInput | VideoLikeCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type VideoCommentCreateWithoutVideoInput = {
    id?: string
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: VideoCommentCreateNestedOneWithoutRepliesInput
    replies?: VideoCommentCreateNestedManyWithoutParentInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type VideoCommentUncheckedCreateWithoutVideoInput = {
    id?: string
    userId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: VideoCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type VideoCommentCreateOrConnectWithoutVideoInput = {
    where: VideoCommentWhereUniqueInput
    create: XOR<VideoCommentCreateWithoutVideoInput, VideoCommentUncheckedCreateWithoutVideoInput>
  }

  export type VideoCommentCreateManyVideoInputEnvelope = {
    data: VideoCommentCreateManyVideoInput | VideoCommentCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutVideosInput = {
    update: XOR<UserUpdateWithoutVideosInput, UserUncheckedUpdateWithoutVideosInput>
    create: XOR<UserCreateWithoutVideosInput, UserUncheckedCreateWithoutVideosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVideosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVideosInput, UserUncheckedUpdateWithoutVideosInput>
  }

  export type UserUpdateWithoutVideosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: VideoLikeUpdateManyWithoutUserNestedInput
    comments?: VideoCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVideosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: VideoLikeUncheckedUpdateManyWithoutUserNestedInput
    comments?: VideoCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VideoLikeUpsertWithWhereUniqueWithoutVideoInput = {
    where: VideoLikeWhereUniqueInput
    update: XOR<VideoLikeUpdateWithoutVideoInput, VideoLikeUncheckedUpdateWithoutVideoInput>
    create: XOR<VideoLikeCreateWithoutVideoInput, VideoLikeUncheckedCreateWithoutVideoInput>
  }

  export type VideoLikeUpdateWithWhereUniqueWithoutVideoInput = {
    where: VideoLikeWhereUniqueInput
    data: XOR<VideoLikeUpdateWithoutVideoInput, VideoLikeUncheckedUpdateWithoutVideoInput>
  }

  export type VideoLikeUpdateManyWithWhereWithoutVideoInput = {
    where: VideoLikeScalarWhereInput
    data: XOR<VideoLikeUpdateManyMutationInput, VideoLikeUncheckedUpdateManyWithoutVideoInput>
  }

  export type VideoCommentUpsertWithWhereUniqueWithoutVideoInput = {
    where: VideoCommentWhereUniqueInput
    update: XOR<VideoCommentUpdateWithoutVideoInput, VideoCommentUncheckedUpdateWithoutVideoInput>
    create: XOR<VideoCommentCreateWithoutVideoInput, VideoCommentUncheckedCreateWithoutVideoInput>
  }

  export type VideoCommentUpdateWithWhereUniqueWithoutVideoInput = {
    where: VideoCommentWhereUniqueInput
    data: XOR<VideoCommentUpdateWithoutVideoInput, VideoCommentUncheckedUpdateWithoutVideoInput>
  }

  export type VideoCommentUpdateManyWithWhereWithoutVideoInput = {
    where: VideoCommentScalarWhereInput
    data: XOR<VideoCommentUpdateManyMutationInput, VideoCommentUncheckedUpdateManyWithoutVideoInput>
  }

  export type VideoCreateWithoutLikesInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVideosInput
    comments?: VideoCommentCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutLikesInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    userId: string
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: VideoCommentUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutLikesInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutLikesInput, VideoUncheckedCreateWithoutLikesInput>
  }

  export type UserCreateWithoutLikesInput = {
    id?: string
    email: string
    password: string
    phone: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: VideoCreateNestedManyWithoutUserInput
    comments?: VideoCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikesInput = {
    id?: string
    email: string
    password: string
    phone: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: VideoUncheckedCreateNestedManyWithoutUserInput
    comments?: VideoCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
  }

  export type VideoUpsertWithoutLikesInput = {
    update: XOR<VideoUpdateWithoutLikesInput, VideoUncheckedUpdateWithoutLikesInput>
    create: XOR<VideoCreateWithoutLikesInput, VideoUncheckedCreateWithoutLikesInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutLikesInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutLikesInput, VideoUncheckedUpdateWithoutLikesInput>
  }

  export type VideoUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVideosNestedInput
    comments?: VideoCommentUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    userId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: VideoCommentUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type UserUpsertWithoutLikesInput = {
    update: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: VideoUpdateManyWithoutUserNestedInput
    comments?: VideoCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: VideoUncheckedUpdateManyWithoutUserNestedInput
    comments?: VideoCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VideoCommentCreateWithoutRepliesInput = {
    id?: string
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: VideoCommentCreateNestedOneWithoutRepliesInput
    video: VideoCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type VideoCommentUncheckedCreateWithoutRepliesInput = {
    id?: string
    videoId: string
    userId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoCommentCreateOrConnectWithoutRepliesInput = {
    where: VideoCommentWhereUniqueInput
    create: XOR<VideoCommentCreateWithoutRepliesInput, VideoCommentUncheckedCreateWithoutRepliesInput>
  }

  export type VideoCommentCreateWithoutParentInput = {
    id?: string
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: VideoCommentCreateNestedManyWithoutParentInput
    video: VideoCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type VideoCommentUncheckedCreateWithoutParentInput = {
    id?: string
    videoId: string
    userId: string
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: VideoCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type VideoCommentCreateOrConnectWithoutParentInput = {
    where: VideoCommentWhereUniqueInput
    create: XOR<VideoCommentCreateWithoutParentInput, VideoCommentUncheckedCreateWithoutParentInput>
  }

  export type VideoCommentCreateManyParentInputEnvelope = {
    data: VideoCommentCreateManyParentInput | VideoCommentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type VideoCreateWithoutCommentsInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVideosInput
    likes?: VideoLikeCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutCommentsInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    userId: string
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: VideoLikeUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutCommentsInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutCommentsInput, VideoUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    email: string
    password: string
    phone: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: VideoCreateNestedManyWithoutUserInput
    likes?: VideoLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    email: string
    password: string
    phone: string
    name: string
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: VideoUncheckedCreateNestedManyWithoutUserInput
    likes?: VideoLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type VideoCommentUpsertWithoutRepliesInput = {
    update: XOR<VideoCommentUpdateWithoutRepliesInput, VideoCommentUncheckedUpdateWithoutRepliesInput>
    create: XOR<VideoCommentCreateWithoutRepliesInput, VideoCommentUncheckedCreateWithoutRepliesInput>
    where?: VideoCommentWhereInput
  }

  export type VideoCommentUpdateToOneWithWhereWithoutRepliesInput = {
    where?: VideoCommentWhereInput
    data: XOR<VideoCommentUpdateWithoutRepliesInput, VideoCommentUncheckedUpdateWithoutRepliesInput>
  }

  export type VideoCommentUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: VideoCommentUpdateOneWithoutRepliesNestedInput
    video?: VideoUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type VideoCommentUncheckedUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoCommentUpsertWithWhereUniqueWithoutParentInput = {
    where: VideoCommentWhereUniqueInput
    update: XOR<VideoCommentUpdateWithoutParentInput, VideoCommentUncheckedUpdateWithoutParentInput>
    create: XOR<VideoCommentCreateWithoutParentInput, VideoCommentUncheckedCreateWithoutParentInput>
  }

  export type VideoCommentUpdateWithWhereUniqueWithoutParentInput = {
    where: VideoCommentWhereUniqueInput
    data: XOR<VideoCommentUpdateWithoutParentInput, VideoCommentUncheckedUpdateWithoutParentInput>
  }

  export type VideoCommentUpdateManyWithWhereWithoutParentInput = {
    where: VideoCommentScalarWhereInput
    data: XOR<VideoCommentUpdateManyMutationInput, VideoCommentUncheckedUpdateManyWithoutParentInput>
  }

  export type VideoUpsertWithoutCommentsInput = {
    update: XOR<VideoUpdateWithoutCommentsInput, VideoUncheckedUpdateWithoutCommentsInput>
    create: XOR<VideoCreateWithoutCommentsInput, VideoUncheckedCreateWithoutCommentsInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutCommentsInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutCommentsInput, VideoUncheckedUpdateWithoutCommentsInput>
  }

  export type VideoUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVideosNestedInput
    likes?: VideoLikeUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    userId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: VideoLikeUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: VideoUpdateManyWithoutUserNestedInput
    likes?: VideoLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: VideoUncheckedUpdateManyWithoutUserNestedInput
    likes?: VideoLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VideoCreateManyUserInput = {
    id?: string
    originalName: string
    fileName: string
    s3Key: string
    url: string
    cdnUrl?: string
    thumbnailUrl?: string | null
    size: number
    duration?: number | null
    mimeType: string
    resolution?: string | null
    status?: $Enums.VideoStatus
    description?: string
    likesCount?: number
    commentsCount?: number
    publishedAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoLikeCreateManyUserInput = {
    id?: string
    videoId: string
    createdAt?: Date | string
  }

  export type VideoCommentCreateManyUserInput = {
    id?: string
    videoId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: VideoLikeUpdateManyWithoutVideoNestedInput
    comments?: VideoCommentUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: VideoLikeUncheckedUpdateManyWithoutVideoNestedInput
    comments?: VideoCommentUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    cdnUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    description?: StringFieldUpdateOperationsInput | string
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: VideoUpdateOneRequiredWithoutLikesNestedInput
  }

  export type VideoLikeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoCommentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: VideoCommentUpdateOneWithoutRepliesNestedInput
    replies?: VideoCommentUpdateManyWithoutParentNestedInput
    video?: VideoUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type VideoCommentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: VideoCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type VideoCommentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeCreateManyVideoInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type VideoCommentCreateManyVideoInput = {
    id?: string
    userId: string
    parentId?: string | null
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoLikeUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type VideoLikeUncheckedUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoLikeUncheckedUpdateManyWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoCommentUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: VideoCommentUpdateOneWithoutRepliesNestedInput
    replies?: VideoCommentUpdateManyWithoutParentNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type VideoCommentUncheckedUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: VideoCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type VideoCommentUncheckedUpdateManyWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoCommentCreateManyParentInput = {
    id?: string
    videoId: string
    userId: string
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoCommentUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: VideoCommentUpdateManyWithoutParentNestedInput
    video?: VideoUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type VideoCommentUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: VideoCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type VideoCommentUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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