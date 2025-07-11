
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model categorias
 * 
 */
export type categorias = $Result.DefaultSelection<Prisma.$categoriasPayload>
/**
 * Model eventos
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type eventos = $Result.DefaultSelection<Prisma.$eventosPayload>
/**
 * Model pagos
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type pagos = $Result.DefaultSelection<Prisma.$pagosPayload>
/**
 * Model registros
 * 
 */
export type registros = $Result.DefaultSelection<Prisma.$registrosPayload>
/**
 * Model usuarios
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type usuarios = $Result.DefaultSelection<Prisma.$usuariosPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categorias
 * const categorias = await prisma.categorias.findMany()
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
   * // Fetch zero or more Categorias
   * const categorias = await prisma.categorias.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.categorias`: Exposes CRUD operations for the **categorias** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categorias.findMany()
    * ```
    */
  get categorias(): Prisma.categoriasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventos`: Exposes CRUD operations for the **eventos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Eventos
    * const eventos = await prisma.eventos.findMany()
    * ```
    */
  get eventos(): Prisma.eventosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pagos`: Exposes CRUD operations for the **pagos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagos
    * const pagos = await prisma.pagos.findMany()
    * ```
    */
  get pagos(): Prisma.pagosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registros`: Exposes CRUD operations for the **registros** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Registros
    * const registros = await prisma.registros.findMany()
    * ```
    */
  get registros(): Prisma.registrosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuarios`: Exposes CRUD operations for the **usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuarios.findMany()
    * ```
    */
  get usuarios(): Prisma.usuariosDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    categorias: 'categorias',
    eventos: 'eventos',
    pagos: 'pagos',
    registros: 'registros',
    usuarios: 'usuarios'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "categorias" | "eventos" | "pagos" | "registros" | "usuarios"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      categorias: {
        payload: Prisma.$categoriasPayload<ExtArgs>
        fields: Prisma.categoriasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoriasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoriasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>
          }
          findFirst: {
            args: Prisma.categoriasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoriasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>
          }
          findMany: {
            args: Prisma.categoriasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>[]
          }
          create: {
            args: Prisma.categoriasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>
          }
          createMany: {
            args: Prisma.categoriasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoriasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>[]
          }
          delete: {
            args: Prisma.categoriasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>
          }
          update: {
            args: Prisma.categoriasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>
          }
          deleteMany: {
            args: Prisma.categoriasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoriasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoriasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>[]
          }
          upsert: {
            args: Prisma.categoriasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriasPayload>
          }
          aggregate: {
            args: Prisma.CategoriasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategorias>
          }
          groupBy: {
            args: Prisma.categoriasGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriasGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoriasCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriasCountAggregateOutputType> | number
          }
        }
      }
      eventos: {
        payload: Prisma.$eventosPayload<ExtArgs>
        fields: Prisma.eventosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.eventosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.eventosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>
          }
          findFirst: {
            args: Prisma.eventosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.eventosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>
          }
          findMany: {
            args: Prisma.eventosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>[]
          }
          create: {
            args: Prisma.eventosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>
          }
          createMany: {
            args: Prisma.eventosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.eventosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>[]
          }
          delete: {
            args: Prisma.eventosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>
          }
          update: {
            args: Prisma.eventosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>
          }
          deleteMany: {
            args: Prisma.eventosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.eventosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.eventosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>[]
          }
          upsert: {
            args: Prisma.eventosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventosPayload>
          }
          aggregate: {
            args: Prisma.EventosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventos>
          }
          groupBy: {
            args: Prisma.eventosGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventosGroupByOutputType>[]
          }
          count: {
            args: Prisma.eventosCountArgs<ExtArgs>
            result: $Utils.Optional<EventosCountAggregateOutputType> | number
          }
        }
      }
      pagos: {
        payload: Prisma.$pagosPayload<ExtArgs>
        fields: Prisma.pagosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pagosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pagosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          findFirst: {
            args: Prisma.pagosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pagosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          findMany: {
            args: Prisma.pagosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>[]
          }
          create: {
            args: Prisma.pagosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          createMany: {
            args: Prisma.pagosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pagosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>[]
          }
          delete: {
            args: Prisma.pagosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          update: {
            args: Prisma.pagosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          deleteMany: {
            args: Prisma.pagosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pagosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pagosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>[]
          }
          upsert: {
            args: Prisma.pagosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagosPayload>
          }
          aggregate: {
            args: Prisma.PagosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePagos>
          }
          groupBy: {
            args: Prisma.pagosGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagosGroupByOutputType>[]
          }
          count: {
            args: Prisma.pagosCountArgs<ExtArgs>
            result: $Utils.Optional<PagosCountAggregateOutputType> | number
          }
        }
      }
      registros: {
        payload: Prisma.$registrosPayload<ExtArgs>
        fields: Prisma.registrosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.registrosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.registrosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>
          }
          findFirst: {
            args: Prisma.registrosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.registrosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>
          }
          findMany: {
            args: Prisma.registrosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>[]
          }
          create: {
            args: Prisma.registrosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>
          }
          createMany: {
            args: Prisma.registrosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.registrosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>[]
          }
          delete: {
            args: Prisma.registrosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>
          }
          update: {
            args: Prisma.registrosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>
          }
          deleteMany: {
            args: Prisma.registrosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.registrosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.registrosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>[]
          }
          upsert: {
            args: Prisma.registrosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrosPayload>
          }
          aggregate: {
            args: Prisma.RegistrosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistros>
          }
          groupBy: {
            args: Prisma.registrosGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrosGroupByOutputType>[]
          }
          count: {
            args: Prisma.registrosCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrosCountAggregateOutputType> | number
          }
        }
      }
      usuarios: {
        payload: Prisma.$usuariosPayload<ExtArgs>
        fields: Prisma.usuariosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usuariosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usuariosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findFirst: {
            args: Prisma.usuariosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usuariosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findMany: {
            args: Prisma.usuariosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          create: {
            args: Prisma.usuariosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          createMany: {
            args: Prisma.usuariosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usuariosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          delete: {
            args: Prisma.usuariosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          update: {
            args: Prisma.usuariosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          deleteMany: {
            args: Prisma.usuariosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usuariosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usuariosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          upsert: {
            args: Prisma.usuariosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          aggregate: {
            args: Prisma.UsuariosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuarios>
          }
          groupBy: {
            args: Prisma.usuariosGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuariosGroupByOutputType>[]
          }
          count: {
            args: Prisma.usuariosCountArgs<ExtArgs>
            result: $Utils.Optional<UsuariosCountAggregateOutputType> | number
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
  }
  export type GlobalOmitConfig = {
    categorias?: categoriasOmit
    eventos?: eventosOmit
    pagos?: pagosOmit
    registros?: registrosOmit
    usuarios?: usuariosOmit
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
   * Count Type CategoriasCountOutputType
   */

  export type CategoriasCountOutputType = {
    eventos: number
  }

  export type CategoriasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventos?: boolean | CategoriasCountOutputTypeCountEventosArgs
  }

  // Custom InputTypes
  /**
   * CategoriasCountOutputType without action
   */
  export type CategoriasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriasCountOutputType
     */
    select?: CategoriasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriasCountOutputType without action
   */
  export type CategoriasCountOutputTypeCountEventosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: eventosWhereInput
  }


  /**
   * Count Type EventosCountOutputType
   */

  export type EventosCountOutputType = {
    registros: number
  }

  export type EventosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registros?: boolean | EventosCountOutputTypeCountRegistrosArgs
  }

  // Custom InputTypes
  /**
   * EventosCountOutputType without action
   */
  export type EventosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventosCountOutputType
     */
    select?: EventosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventosCountOutputType without action
   */
  export type EventosCountOutputTypeCountRegistrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: registrosWhereInput
  }


  /**
   * Count Type PagosCountOutputType
   */

  export type PagosCountOutputType = {
    registros: number
  }

  export type PagosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registros?: boolean | PagosCountOutputTypeCountRegistrosArgs
  }

  // Custom InputTypes
  /**
   * PagosCountOutputType without action
   */
  export type PagosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagosCountOutputType
     */
    select?: PagosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PagosCountOutputType without action
   */
  export type PagosCountOutputTypeCountRegistrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: registrosWhereInput
  }


  /**
   * Count Type UsuariosCountOutputType
   */

  export type UsuariosCountOutputType = {
    pagos: number
    registros: number
  }

  export type UsuariosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pagos?: boolean | UsuariosCountOutputTypeCountPagosArgs
    registros?: boolean | UsuariosCountOutputTypeCountRegistrosArgs
  }

  // Custom InputTypes
  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuariosCountOutputType
     */
    select?: UsuariosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeCountPagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pagosWhereInput
  }

  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeCountRegistrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: registrosWhereInput
  }


  /**
   * Models
   */

  /**
   * Model categorias
   */

  export type AggregateCategorias = {
    _count: CategoriasCountAggregateOutputType | null
    _avg: CategoriasAvgAggregateOutputType | null
    _sum: CategoriasSumAggregateOutputType | null
    _min: CategoriasMinAggregateOutputType | null
    _max: CategoriasMaxAggregateOutputType | null
  }

  export type CategoriasAvgAggregateOutputType = {
    id_categoria: number | null
  }

  export type CategoriasSumAggregateOutputType = {
    id_categoria: bigint | null
  }

  export type CategoriasMinAggregateOutputType = {
    id_categoria: bigint | null
    nombre: string | null
    descripcion: string | null
    creado_categoria: Date | null
  }

  export type CategoriasMaxAggregateOutputType = {
    id_categoria: bigint | null
    nombre: string | null
    descripcion: string | null
    creado_categoria: Date | null
  }

  export type CategoriasCountAggregateOutputType = {
    id_categoria: number
    nombre: number
    descripcion: number
    creado_categoria: number
    _all: number
  }


  export type CategoriasAvgAggregateInputType = {
    id_categoria?: true
  }

  export type CategoriasSumAggregateInputType = {
    id_categoria?: true
  }

  export type CategoriasMinAggregateInputType = {
    id_categoria?: true
    nombre?: true
    descripcion?: true
    creado_categoria?: true
  }

  export type CategoriasMaxAggregateInputType = {
    id_categoria?: true
    nombre?: true
    descripcion?: true
    creado_categoria?: true
  }

  export type CategoriasCountAggregateInputType = {
    id_categoria?: true
    nombre?: true
    descripcion?: true
    creado_categoria?: true
    _all?: true
  }

  export type CategoriasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categorias to aggregate.
     */
    where?: categoriasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categorias to fetch.
     */
    orderBy?: categoriasOrderByWithRelationInput | categoriasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoriasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categorias
    **/
    _count?: true | CategoriasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriasMaxAggregateInputType
  }

  export type GetCategoriasAggregateType<T extends CategoriasAggregateArgs> = {
        [P in keyof T & keyof AggregateCategorias]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategorias[P]>
      : GetScalarType<T[P], AggregateCategorias[P]>
  }




  export type categoriasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriasWhereInput
    orderBy?: categoriasOrderByWithAggregationInput | categoriasOrderByWithAggregationInput[]
    by: CategoriasScalarFieldEnum[] | CategoriasScalarFieldEnum
    having?: categoriasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriasCountAggregateInputType | true
    _avg?: CategoriasAvgAggregateInputType
    _sum?: CategoriasSumAggregateInputType
    _min?: CategoriasMinAggregateInputType
    _max?: CategoriasMaxAggregateInputType
  }

  export type CategoriasGroupByOutputType = {
    id_categoria: bigint
    nombre: string
    descripcion: string | null
    creado_categoria: Date | null
    _count: CategoriasCountAggregateOutputType | null
    _avg: CategoriasAvgAggregateOutputType | null
    _sum: CategoriasSumAggregateOutputType | null
    _min: CategoriasMinAggregateOutputType | null
    _max: CategoriasMaxAggregateOutputType | null
  }

  type GetCategoriasGroupByPayload<T extends categoriasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriasGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriasGroupByOutputType[P]>
        }
      >
    >


  export type categoriasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
    descripcion?: boolean
    creado_categoria?: boolean
    eventos?: boolean | categorias$eventosArgs<ExtArgs>
    _count?: boolean | CategoriasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categorias"]>

  export type categoriasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
    descripcion?: boolean
    creado_categoria?: boolean
  }, ExtArgs["result"]["categorias"]>

  export type categoriasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
    descripcion?: boolean
    creado_categoria?: boolean
  }, ExtArgs["result"]["categorias"]>

  export type categoriasSelectScalar = {
    id_categoria?: boolean
    nombre?: boolean
    descripcion?: boolean
    creado_categoria?: boolean
  }

  export type categoriasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_categoria" | "nombre" | "descripcion" | "creado_categoria", ExtArgs["result"]["categorias"]>
  export type categoriasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventos?: boolean | categorias$eventosArgs<ExtArgs>
    _count?: boolean | CategoriasCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type categoriasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type categoriasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $categoriasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categorias"
    objects: {
      eventos: Prisma.$eventosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_categoria: bigint
      nombre: string
      descripcion: string | null
      creado_categoria: Date | null
    }, ExtArgs["result"]["categorias"]>
    composites: {}
  }

  type categoriasGetPayload<S extends boolean | null | undefined | categoriasDefaultArgs> = $Result.GetResult<Prisma.$categoriasPayload, S>

  type categoriasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoriasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriasCountAggregateInputType | true
    }

  export interface categoriasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categorias'], meta: { name: 'categorias' } }
    /**
     * Find zero or one Categorias that matches the filter.
     * @param {categoriasFindUniqueArgs} args - Arguments to find a Categorias
     * @example
     * // Get one Categorias
     * const categorias = await prisma.categorias.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoriasFindUniqueArgs>(args: SelectSubset<T, categoriasFindUniqueArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categorias that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoriasFindUniqueOrThrowArgs} args - Arguments to find a Categorias
     * @example
     * // Get one Categorias
     * const categorias = await prisma.categorias.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoriasFindUniqueOrThrowArgs>(args: SelectSubset<T, categoriasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriasFindFirstArgs} args - Arguments to find a Categorias
     * @example
     * // Get one Categorias
     * const categorias = await prisma.categorias.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoriasFindFirstArgs>(args?: SelectSubset<T, categoriasFindFirstArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categorias that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriasFindFirstOrThrowArgs} args - Arguments to find a Categorias
     * @example
     * // Get one Categorias
     * const categorias = await prisma.categorias.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoriasFindFirstOrThrowArgs>(args?: SelectSubset<T, categoriasFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categorias.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categorias.findMany({ take: 10 })
     * 
     * // Only select the `id_categoria`
     * const categoriasWithId_categoriaOnly = await prisma.categorias.findMany({ select: { id_categoria: true } })
     * 
     */
    findMany<T extends categoriasFindManyArgs>(args?: SelectSubset<T, categoriasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categorias.
     * @param {categoriasCreateArgs} args - Arguments to create a Categorias.
     * @example
     * // Create one Categorias
     * const Categorias = await prisma.categorias.create({
     *   data: {
     *     // ... data to create a Categorias
     *   }
     * })
     * 
     */
    create<T extends categoriasCreateArgs>(args: SelectSubset<T, categoriasCreateArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {categoriasCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categorias = await prisma.categorias.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoriasCreateManyArgs>(args?: SelectSubset<T, categoriasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {categoriasCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categorias = await prisma.categorias.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id_categoria`
     * const categoriasWithId_categoriaOnly = await prisma.categorias.createManyAndReturn({
     *   select: { id_categoria: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoriasCreateManyAndReturnArgs>(args?: SelectSubset<T, categoriasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categorias.
     * @param {categoriasDeleteArgs} args - Arguments to delete one Categorias.
     * @example
     * // Delete one Categorias
     * const Categorias = await prisma.categorias.delete({
     *   where: {
     *     // ... filter to delete one Categorias
     *   }
     * })
     * 
     */
    delete<T extends categoriasDeleteArgs>(args: SelectSubset<T, categoriasDeleteArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categorias.
     * @param {categoriasUpdateArgs} args - Arguments to update one Categorias.
     * @example
     * // Update one Categorias
     * const categorias = await prisma.categorias.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoriasUpdateArgs>(args: SelectSubset<T, categoriasUpdateArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {categoriasDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categorias.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoriasDeleteManyArgs>(args?: SelectSubset<T, categoriasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categorias = await prisma.categorias.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoriasUpdateManyArgs>(args: SelectSubset<T, categoriasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {categoriasUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categorias = await prisma.categorias.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id_categoria`
     * const categoriasWithId_categoriaOnly = await prisma.categorias.updateManyAndReturn({
     *   select: { id_categoria: true },
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
    updateManyAndReturn<T extends categoriasUpdateManyAndReturnArgs>(args: SelectSubset<T, categoriasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categorias.
     * @param {categoriasUpsertArgs} args - Arguments to update or create a Categorias.
     * @example
     * // Update or create a Categorias
     * const categorias = await prisma.categorias.upsert({
     *   create: {
     *     // ... data to create a Categorias
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categorias we want to update
     *   }
     * })
     */
    upsert<T extends categoriasUpsertArgs>(args: SelectSubset<T, categoriasUpsertArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriasCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categorias.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends categoriasCountArgs>(
      args?: Subset<T, categoriasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoriasAggregateArgs>(args: Subset<T, CategoriasAggregateArgs>): Prisma.PrismaPromise<GetCategoriasAggregateType<T>>

    /**
     * Group by Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriasGroupByArgs} args - Group by arguments.
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
      T extends categoriasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoriasGroupByArgs['orderBy'] }
        : { orderBy?: categoriasGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, categoriasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categorias model
   */
  readonly fields: categoriasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categorias.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoriasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eventos<T extends categorias$eventosArgs<ExtArgs> = {}>(args?: Subset<T, categorias$eventosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the categorias model
   */
  interface categoriasFieldRefs {
    readonly id_categoria: FieldRef<"categorias", 'BigInt'>
    readonly nombre: FieldRef<"categorias", 'String'>
    readonly descripcion: FieldRef<"categorias", 'String'>
    readonly creado_categoria: FieldRef<"categorias", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * categorias findUnique
   */
  export type categoriasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * Filter, which categorias to fetch.
     */
    where: categoriasWhereUniqueInput
  }

  /**
   * categorias findUniqueOrThrow
   */
  export type categoriasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * Filter, which categorias to fetch.
     */
    where: categoriasWhereUniqueInput
  }

  /**
   * categorias findFirst
   */
  export type categoriasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * Filter, which categorias to fetch.
     */
    where?: categoriasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categorias to fetch.
     */
    orderBy?: categoriasOrderByWithRelationInput | categoriasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categorias.
     */
    cursor?: categoriasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categorias.
     */
    distinct?: CategoriasScalarFieldEnum | CategoriasScalarFieldEnum[]
  }

  /**
   * categorias findFirstOrThrow
   */
  export type categoriasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * Filter, which categorias to fetch.
     */
    where?: categoriasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categorias to fetch.
     */
    orderBy?: categoriasOrderByWithRelationInput | categoriasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categorias.
     */
    cursor?: categoriasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categorias.
     */
    distinct?: CategoriasScalarFieldEnum | CategoriasScalarFieldEnum[]
  }

  /**
   * categorias findMany
   */
  export type categoriasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * Filter, which categorias to fetch.
     */
    where?: categoriasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categorias to fetch.
     */
    orderBy?: categoriasOrderByWithRelationInput | categoriasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categorias.
     */
    cursor?: categoriasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categorias.
     */
    skip?: number
    distinct?: CategoriasScalarFieldEnum | CategoriasScalarFieldEnum[]
  }

  /**
   * categorias create
   */
  export type categoriasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * The data needed to create a categorias.
     */
    data: XOR<categoriasCreateInput, categoriasUncheckedCreateInput>
  }

  /**
   * categorias createMany
   */
  export type categoriasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categorias.
     */
    data: categoriasCreateManyInput | categoriasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categorias createManyAndReturn
   */
  export type categoriasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * The data used to create many categorias.
     */
    data: categoriasCreateManyInput | categoriasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categorias update
   */
  export type categoriasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * The data needed to update a categorias.
     */
    data: XOR<categoriasUpdateInput, categoriasUncheckedUpdateInput>
    /**
     * Choose, which categorias to update.
     */
    where: categoriasWhereUniqueInput
  }

  /**
   * categorias updateMany
   */
  export type categoriasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categorias.
     */
    data: XOR<categoriasUpdateManyMutationInput, categoriasUncheckedUpdateManyInput>
    /**
     * Filter which categorias to update
     */
    where?: categoriasWhereInput
    /**
     * Limit how many categorias to update.
     */
    limit?: number
  }

  /**
   * categorias updateManyAndReturn
   */
  export type categoriasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * The data used to update categorias.
     */
    data: XOR<categoriasUpdateManyMutationInput, categoriasUncheckedUpdateManyInput>
    /**
     * Filter which categorias to update
     */
    where?: categoriasWhereInput
    /**
     * Limit how many categorias to update.
     */
    limit?: number
  }

  /**
   * categorias upsert
   */
  export type categoriasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * The filter to search for the categorias to update in case it exists.
     */
    where: categoriasWhereUniqueInput
    /**
     * In case the categorias found by the `where` argument doesn't exist, create a new categorias with this data.
     */
    create: XOR<categoriasCreateInput, categoriasUncheckedCreateInput>
    /**
     * In case the categorias was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoriasUpdateInput, categoriasUncheckedUpdateInput>
  }

  /**
   * categorias delete
   */
  export type categoriasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
    /**
     * Filter which categorias to delete.
     */
    where: categoriasWhereUniqueInput
  }

  /**
   * categorias deleteMany
   */
  export type categoriasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categorias to delete
     */
    where?: categoriasWhereInput
    /**
     * Limit how many categorias to delete.
     */
    limit?: number
  }

  /**
   * categorias.eventos
   */
  export type categorias$eventosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    where?: eventosWhereInput
    orderBy?: eventosOrderByWithRelationInput | eventosOrderByWithRelationInput[]
    cursor?: eventosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventosScalarFieldEnum | EventosScalarFieldEnum[]
  }

  /**
   * categorias without action
   */
  export type categoriasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categorias
     */
    select?: categoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categorias
     */
    omit?: categoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriasInclude<ExtArgs> | null
  }


  /**
   * Model eventos
   */

  export type AggregateEventos = {
    _count: EventosCountAggregateOutputType | null
    _avg: EventosAvgAggregateOutputType | null
    _sum: EventosSumAggregateOutputType | null
    _min: EventosMinAggregateOutputType | null
    _max: EventosMaxAggregateOutputType | null
  }

  export type EventosAvgAggregateOutputType = {
    id_evento: number | null
    precio: Decimal | null
    id_categoria: number | null
  }

  export type EventosSumAggregateOutputType = {
    id_evento: bigint | null
    precio: Decimal | null
    id_categoria: bigint | null
  }

  export type EventosMinAggregateOutputType = {
    id_evento: bigint | null
    titulo: string | null
    descripcion: string | null
    ubicacion: string | null
    fecha_inicio: Date | null
    fecha_fin: Date | null
    precio: Decimal | null
    imagen: string | null
    id_categoria: bigint | null
    creado_evento: Date | null
    actualizado_evento: Date | null
  }

  export type EventosMaxAggregateOutputType = {
    id_evento: bigint | null
    titulo: string | null
    descripcion: string | null
    ubicacion: string | null
    fecha_inicio: Date | null
    fecha_fin: Date | null
    precio: Decimal | null
    imagen: string | null
    id_categoria: bigint | null
    creado_evento: Date | null
    actualizado_evento: Date | null
  }

  export type EventosCountAggregateOutputType = {
    id_evento: number
    titulo: number
    descripcion: number
    ubicacion: number
    fecha_inicio: number
    fecha_fin: number
    precio: number
    imagen: number
    id_categoria: number
    creado_evento: number
    actualizado_evento: number
    _all: number
  }


  export type EventosAvgAggregateInputType = {
    id_evento?: true
    precio?: true
    id_categoria?: true
  }

  export type EventosSumAggregateInputType = {
    id_evento?: true
    precio?: true
    id_categoria?: true
  }

  export type EventosMinAggregateInputType = {
    id_evento?: true
    titulo?: true
    descripcion?: true
    ubicacion?: true
    fecha_inicio?: true
    fecha_fin?: true
    precio?: true
    imagen?: true
    id_categoria?: true
    creado_evento?: true
    actualizado_evento?: true
  }

  export type EventosMaxAggregateInputType = {
    id_evento?: true
    titulo?: true
    descripcion?: true
    ubicacion?: true
    fecha_inicio?: true
    fecha_fin?: true
    precio?: true
    imagen?: true
    id_categoria?: true
    creado_evento?: true
    actualizado_evento?: true
  }

  export type EventosCountAggregateInputType = {
    id_evento?: true
    titulo?: true
    descripcion?: true
    ubicacion?: true
    fecha_inicio?: true
    fecha_fin?: true
    precio?: true
    imagen?: true
    id_categoria?: true
    creado_evento?: true
    actualizado_evento?: true
    _all?: true
  }

  export type EventosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which eventos to aggregate.
     */
    where?: eventosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eventos to fetch.
     */
    orderBy?: eventosOrderByWithRelationInput | eventosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: eventosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned eventos
    **/
    _count?: true | EventosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventosMaxAggregateInputType
  }

  export type GetEventosAggregateType<T extends EventosAggregateArgs> = {
        [P in keyof T & keyof AggregateEventos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventos[P]>
      : GetScalarType<T[P], AggregateEventos[P]>
  }




  export type eventosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: eventosWhereInput
    orderBy?: eventosOrderByWithAggregationInput | eventosOrderByWithAggregationInput[]
    by: EventosScalarFieldEnum[] | EventosScalarFieldEnum
    having?: eventosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventosCountAggregateInputType | true
    _avg?: EventosAvgAggregateInputType
    _sum?: EventosSumAggregateInputType
    _min?: EventosMinAggregateInputType
    _max?: EventosMaxAggregateInputType
  }

  export type EventosGroupByOutputType = {
    id_evento: bigint
    titulo: string
    descripcion: string | null
    ubicacion: string | null
    fecha_inicio: Date
    fecha_fin: Date
    precio: Decimal | null
    imagen: string | null
    id_categoria: bigint
    creado_evento: Date | null
    actualizado_evento: Date | null
    _count: EventosCountAggregateOutputType | null
    _avg: EventosAvgAggregateOutputType | null
    _sum: EventosSumAggregateOutputType | null
    _min: EventosMinAggregateOutputType | null
    _max: EventosMaxAggregateOutputType | null
  }

  type GetEventosGroupByPayload<T extends eventosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventosGroupByOutputType[P]>
            : GetScalarType<T[P], EventosGroupByOutputType[P]>
        }
      >
    >


  export type eventosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_evento?: boolean
    titulo?: boolean
    descripcion?: boolean
    ubicacion?: boolean
    fecha_inicio?: boolean
    fecha_fin?: boolean
    precio?: boolean
    imagen?: boolean
    id_categoria?: boolean
    creado_evento?: boolean
    actualizado_evento?: boolean
    categorias?: boolean | categoriasDefaultArgs<ExtArgs>
    registros?: boolean | eventos$registrosArgs<ExtArgs>
    _count?: boolean | EventosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventos"]>

  export type eventosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_evento?: boolean
    titulo?: boolean
    descripcion?: boolean
    ubicacion?: boolean
    fecha_inicio?: boolean
    fecha_fin?: boolean
    precio?: boolean
    imagen?: boolean
    id_categoria?: boolean
    creado_evento?: boolean
    actualizado_evento?: boolean
    categorias?: boolean | categoriasDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventos"]>

  export type eventosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_evento?: boolean
    titulo?: boolean
    descripcion?: boolean
    ubicacion?: boolean
    fecha_inicio?: boolean
    fecha_fin?: boolean
    precio?: boolean
    imagen?: boolean
    id_categoria?: boolean
    creado_evento?: boolean
    actualizado_evento?: boolean
    categorias?: boolean | categoriasDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventos"]>

  export type eventosSelectScalar = {
    id_evento?: boolean
    titulo?: boolean
    descripcion?: boolean
    ubicacion?: boolean
    fecha_inicio?: boolean
    fecha_fin?: boolean
    precio?: boolean
    imagen?: boolean
    id_categoria?: boolean
    creado_evento?: boolean
    actualizado_evento?: boolean
  }

  export type eventosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_evento" | "titulo" | "descripcion" | "ubicacion" | "fecha_inicio" | "fecha_fin" | "precio" | "imagen" | "id_categoria" | "creado_evento" | "actualizado_evento", ExtArgs["result"]["eventos"]>
  export type eventosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorias?: boolean | categoriasDefaultArgs<ExtArgs>
    registros?: boolean | eventos$registrosArgs<ExtArgs>
    _count?: boolean | EventosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type eventosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorias?: boolean | categoriasDefaultArgs<ExtArgs>
  }
  export type eventosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorias?: boolean | categoriasDefaultArgs<ExtArgs>
  }

  export type $eventosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "eventos"
    objects: {
      categorias: Prisma.$categoriasPayload<ExtArgs>
      registros: Prisma.$registrosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_evento: bigint
      titulo: string
      descripcion: string | null
      ubicacion: string | null
      fecha_inicio: Date
      fecha_fin: Date
      precio: Prisma.Decimal | null
      imagen: string | null
      id_categoria: bigint
      creado_evento: Date | null
      actualizado_evento: Date | null
    }, ExtArgs["result"]["eventos"]>
    composites: {}
  }

  type eventosGetPayload<S extends boolean | null | undefined | eventosDefaultArgs> = $Result.GetResult<Prisma.$eventosPayload, S>

  type eventosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<eventosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventosCountAggregateInputType | true
    }

  export interface eventosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['eventos'], meta: { name: 'eventos' } }
    /**
     * Find zero or one Eventos that matches the filter.
     * @param {eventosFindUniqueArgs} args - Arguments to find a Eventos
     * @example
     * // Get one Eventos
     * const eventos = await prisma.eventos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends eventosFindUniqueArgs>(args: SelectSubset<T, eventosFindUniqueArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Eventos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {eventosFindUniqueOrThrowArgs} args - Arguments to find a Eventos
     * @example
     * // Get one Eventos
     * const eventos = await prisma.eventos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends eventosFindUniqueOrThrowArgs>(args: SelectSubset<T, eventosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eventos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventosFindFirstArgs} args - Arguments to find a Eventos
     * @example
     * // Get one Eventos
     * const eventos = await prisma.eventos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends eventosFindFirstArgs>(args?: SelectSubset<T, eventosFindFirstArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eventos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventosFindFirstOrThrowArgs} args - Arguments to find a Eventos
     * @example
     * // Get one Eventos
     * const eventos = await prisma.eventos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends eventosFindFirstOrThrowArgs>(args?: SelectSubset<T, eventosFindFirstOrThrowArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Eventos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eventos
     * const eventos = await prisma.eventos.findMany()
     * 
     * // Get first 10 Eventos
     * const eventos = await prisma.eventos.findMany({ take: 10 })
     * 
     * // Only select the `id_evento`
     * const eventosWithId_eventoOnly = await prisma.eventos.findMany({ select: { id_evento: true } })
     * 
     */
    findMany<T extends eventosFindManyArgs>(args?: SelectSubset<T, eventosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Eventos.
     * @param {eventosCreateArgs} args - Arguments to create a Eventos.
     * @example
     * // Create one Eventos
     * const Eventos = await prisma.eventos.create({
     *   data: {
     *     // ... data to create a Eventos
     *   }
     * })
     * 
     */
    create<T extends eventosCreateArgs>(args: SelectSubset<T, eventosCreateArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Eventos.
     * @param {eventosCreateManyArgs} args - Arguments to create many Eventos.
     * @example
     * // Create many Eventos
     * const eventos = await prisma.eventos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends eventosCreateManyArgs>(args?: SelectSubset<T, eventosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Eventos and returns the data saved in the database.
     * @param {eventosCreateManyAndReturnArgs} args - Arguments to create many Eventos.
     * @example
     * // Create many Eventos
     * const eventos = await prisma.eventos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Eventos and only return the `id_evento`
     * const eventosWithId_eventoOnly = await prisma.eventos.createManyAndReturn({
     *   select: { id_evento: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends eventosCreateManyAndReturnArgs>(args?: SelectSubset<T, eventosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Eventos.
     * @param {eventosDeleteArgs} args - Arguments to delete one Eventos.
     * @example
     * // Delete one Eventos
     * const Eventos = await prisma.eventos.delete({
     *   where: {
     *     // ... filter to delete one Eventos
     *   }
     * })
     * 
     */
    delete<T extends eventosDeleteArgs>(args: SelectSubset<T, eventosDeleteArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Eventos.
     * @param {eventosUpdateArgs} args - Arguments to update one Eventos.
     * @example
     * // Update one Eventos
     * const eventos = await prisma.eventos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends eventosUpdateArgs>(args: SelectSubset<T, eventosUpdateArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Eventos.
     * @param {eventosDeleteManyArgs} args - Arguments to filter Eventos to delete.
     * @example
     * // Delete a few Eventos
     * const { count } = await prisma.eventos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends eventosDeleteManyArgs>(args?: SelectSubset<T, eventosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eventos
     * const eventos = await prisma.eventos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends eventosUpdateManyArgs>(args: SelectSubset<T, eventosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eventos and returns the data updated in the database.
     * @param {eventosUpdateManyAndReturnArgs} args - Arguments to update many Eventos.
     * @example
     * // Update many Eventos
     * const eventos = await prisma.eventos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Eventos and only return the `id_evento`
     * const eventosWithId_eventoOnly = await prisma.eventos.updateManyAndReturn({
     *   select: { id_evento: true },
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
    updateManyAndReturn<T extends eventosUpdateManyAndReturnArgs>(args: SelectSubset<T, eventosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Eventos.
     * @param {eventosUpsertArgs} args - Arguments to update or create a Eventos.
     * @example
     * // Update or create a Eventos
     * const eventos = await prisma.eventos.upsert({
     *   create: {
     *     // ... data to create a Eventos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eventos we want to update
     *   }
     * })
     */
    upsert<T extends eventosUpsertArgs>(args: SelectSubset<T, eventosUpsertArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventosCountArgs} args - Arguments to filter Eventos to count.
     * @example
     * // Count the number of Eventos
     * const count = await prisma.eventos.count({
     *   where: {
     *     // ... the filter for the Eventos we want to count
     *   }
     * })
    **/
    count<T extends eventosCountArgs>(
      args?: Subset<T, eventosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventosAggregateArgs>(args: Subset<T, EventosAggregateArgs>): Prisma.PrismaPromise<GetEventosAggregateType<T>>

    /**
     * Group by Eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventosGroupByArgs} args - Group by arguments.
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
      T extends eventosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: eventosGroupByArgs['orderBy'] }
        : { orderBy?: eventosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, eventosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the eventos model
   */
  readonly fields: eventosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for eventos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__eventosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categorias<T extends categoriasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, categoriasDefaultArgs<ExtArgs>>): Prisma__categoriasClient<$Result.GetResult<Prisma.$categoriasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    registros<T extends eventos$registrosArgs<ExtArgs> = {}>(args?: Subset<T, eventos$registrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the eventos model
   */
  interface eventosFieldRefs {
    readonly id_evento: FieldRef<"eventos", 'BigInt'>
    readonly titulo: FieldRef<"eventos", 'String'>
    readonly descripcion: FieldRef<"eventos", 'String'>
    readonly ubicacion: FieldRef<"eventos", 'String'>
    readonly fecha_inicio: FieldRef<"eventos", 'DateTime'>
    readonly fecha_fin: FieldRef<"eventos", 'DateTime'>
    readonly precio: FieldRef<"eventos", 'Decimal'>
    readonly imagen: FieldRef<"eventos", 'String'>
    readonly id_categoria: FieldRef<"eventos", 'BigInt'>
    readonly creado_evento: FieldRef<"eventos", 'DateTime'>
    readonly actualizado_evento: FieldRef<"eventos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * eventos findUnique
   */
  export type eventosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * Filter, which eventos to fetch.
     */
    where: eventosWhereUniqueInput
  }

  /**
   * eventos findUniqueOrThrow
   */
  export type eventosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * Filter, which eventos to fetch.
     */
    where: eventosWhereUniqueInput
  }

  /**
   * eventos findFirst
   */
  export type eventosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * Filter, which eventos to fetch.
     */
    where?: eventosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eventos to fetch.
     */
    orderBy?: eventosOrderByWithRelationInput | eventosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for eventos.
     */
    cursor?: eventosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of eventos.
     */
    distinct?: EventosScalarFieldEnum | EventosScalarFieldEnum[]
  }

  /**
   * eventos findFirstOrThrow
   */
  export type eventosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * Filter, which eventos to fetch.
     */
    where?: eventosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eventos to fetch.
     */
    orderBy?: eventosOrderByWithRelationInput | eventosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for eventos.
     */
    cursor?: eventosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of eventos.
     */
    distinct?: EventosScalarFieldEnum | EventosScalarFieldEnum[]
  }

  /**
   * eventos findMany
   */
  export type eventosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * Filter, which eventos to fetch.
     */
    where?: eventosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eventos to fetch.
     */
    orderBy?: eventosOrderByWithRelationInput | eventosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing eventos.
     */
    cursor?: eventosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eventos.
     */
    skip?: number
    distinct?: EventosScalarFieldEnum | EventosScalarFieldEnum[]
  }

  /**
   * eventos create
   */
  export type eventosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * The data needed to create a eventos.
     */
    data: XOR<eventosCreateInput, eventosUncheckedCreateInput>
  }

  /**
   * eventos createMany
   */
  export type eventosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many eventos.
     */
    data: eventosCreateManyInput | eventosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * eventos createManyAndReturn
   */
  export type eventosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * The data used to create many eventos.
     */
    data: eventosCreateManyInput | eventosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * eventos update
   */
  export type eventosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * The data needed to update a eventos.
     */
    data: XOR<eventosUpdateInput, eventosUncheckedUpdateInput>
    /**
     * Choose, which eventos to update.
     */
    where: eventosWhereUniqueInput
  }

  /**
   * eventos updateMany
   */
  export type eventosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update eventos.
     */
    data: XOR<eventosUpdateManyMutationInput, eventosUncheckedUpdateManyInput>
    /**
     * Filter which eventos to update
     */
    where?: eventosWhereInput
    /**
     * Limit how many eventos to update.
     */
    limit?: number
  }

  /**
   * eventos updateManyAndReturn
   */
  export type eventosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * The data used to update eventos.
     */
    data: XOR<eventosUpdateManyMutationInput, eventosUncheckedUpdateManyInput>
    /**
     * Filter which eventos to update
     */
    where?: eventosWhereInput
    /**
     * Limit how many eventos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * eventos upsert
   */
  export type eventosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * The filter to search for the eventos to update in case it exists.
     */
    where: eventosWhereUniqueInput
    /**
     * In case the eventos found by the `where` argument doesn't exist, create a new eventos with this data.
     */
    create: XOR<eventosCreateInput, eventosUncheckedCreateInput>
    /**
     * In case the eventos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<eventosUpdateInput, eventosUncheckedUpdateInput>
  }

  /**
   * eventos delete
   */
  export type eventosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
    /**
     * Filter which eventos to delete.
     */
    where: eventosWhereUniqueInput
  }

  /**
   * eventos deleteMany
   */
  export type eventosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which eventos to delete
     */
    where?: eventosWhereInput
    /**
     * Limit how many eventos to delete.
     */
    limit?: number
  }

  /**
   * eventos.registros
   */
  export type eventos$registrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    where?: registrosWhereInput
    orderBy?: registrosOrderByWithRelationInput | registrosOrderByWithRelationInput[]
    cursor?: registrosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * eventos without action
   */
  export type eventosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos
     */
    select?: eventosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventos
     */
    omit?: eventosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventosInclude<ExtArgs> | null
  }


  /**
   * Model pagos
   */

  export type AggregatePagos = {
    _count: PagosCountAggregateOutputType | null
    _avg: PagosAvgAggregateOutputType | null
    _sum: PagosSumAggregateOutputType | null
    _min: PagosMinAggregateOutputType | null
    _max: PagosMaxAggregateOutputType | null
  }

  export type PagosAvgAggregateOutputType = {
    id_pago: number | null
    id_usuario: number | null
    monto: Decimal | null
  }

  export type PagosSumAggregateOutputType = {
    id_pago: bigint | null
    id_usuario: bigint | null
    monto: Decimal | null
  }

  export type PagosMinAggregateOutputType = {
    id_pago: bigint | null
    id_usuario: bigint | null
    monto: Decimal | null
    metodo_pago: string | null
    estado_pago: string | null
    fecha_pago: Date | null
  }

  export type PagosMaxAggregateOutputType = {
    id_pago: bigint | null
    id_usuario: bigint | null
    monto: Decimal | null
    metodo_pago: string | null
    estado_pago: string | null
    fecha_pago: Date | null
  }

  export type PagosCountAggregateOutputType = {
    id_pago: number
    id_usuario: number
    monto: number
    metodo_pago: number
    estado_pago: number
    fecha_pago: number
    _all: number
  }


  export type PagosAvgAggregateInputType = {
    id_pago?: true
    id_usuario?: true
    monto?: true
  }

  export type PagosSumAggregateInputType = {
    id_pago?: true
    id_usuario?: true
    monto?: true
  }

  export type PagosMinAggregateInputType = {
    id_pago?: true
    id_usuario?: true
    monto?: true
    metodo_pago?: true
    estado_pago?: true
    fecha_pago?: true
  }

  export type PagosMaxAggregateInputType = {
    id_pago?: true
    id_usuario?: true
    monto?: true
    metodo_pago?: true
    estado_pago?: true
    fecha_pago?: true
  }

  export type PagosCountAggregateInputType = {
    id_pago?: true
    id_usuario?: true
    monto?: true
    metodo_pago?: true
    estado_pago?: true
    fecha_pago?: true
    _all?: true
  }

  export type PagosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pagos to aggregate.
     */
    where?: pagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagos to fetch.
     */
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pagos
    **/
    _count?: true | PagosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagosMaxAggregateInputType
  }

  export type GetPagosAggregateType<T extends PagosAggregateArgs> = {
        [P in keyof T & keyof AggregatePagos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePagos[P]>
      : GetScalarType<T[P], AggregatePagos[P]>
  }




  export type pagosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pagosWhereInput
    orderBy?: pagosOrderByWithAggregationInput | pagosOrderByWithAggregationInput[]
    by: PagosScalarFieldEnum[] | PagosScalarFieldEnum
    having?: pagosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagosCountAggregateInputType | true
    _avg?: PagosAvgAggregateInputType
    _sum?: PagosSumAggregateInputType
    _min?: PagosMinAggregateInputType
    _max?: PagosMaxAggregateInputType
  }

  export type PagosGroupByOutputType = {
    id_pago: bigint
    id_usuario: bigint | null
    monto: Decimal
    metodo_pago: string
    estado_pago: string | null
    fecha_pago: Date | null
    _count: PagosCountAggregateOutputType | null
    _avg: PagosAvgAggregateOutputType | null
    _sum: PagosSumAggregateOutputType | null
    _min: PagosMinAggregateOutputType | null
    _max: PagosMaxAggregateOutputType | null
  }

  type GetPagosGroupByPayload<T extends pagosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagosGroupByOutputType[P]>
            : GetScalarType<T[P], PagosGroupByOutputType[P]>
        }
      >
    >


  export type pagosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_pago?: boolean
    id_usuario?: boolean
    monto?: boolean
    metodo_pago?: boolean
    estado_pago?: boolean
    fecha_pago?: boolean
    usuarios?: boolean | pagos$usuariosArgs<ExtArgs>
    registros?: boolean | pagos$registrosArgs<ExtArgs>
    _count?: boolean | PagosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pagos"]>

  export type pagosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_pago?: boolean
    id_usuario?: boolean
    monto?: boolean
    metodo_pago?: boolean
    estado_pago?: boolean
    fecha_pago?: boolean
    usuarios?: boolean | pagos$usuariosArgs<ExtArgs>
  }, ExtArgs["result"]["pagos"]>

  export type pagosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_pago?: boolean
    id_usuario?: boolean
    monto?: boolean
    metodo_pago?: boolean
    estado_pago?: boolean
    fecha_pago?: boolean
    usuarios?: boolean | pagos$usuariosArgs<ExtArgs>
  }, ExtArgs["result"]["pagos"]>

  export type pagosSelectScalar = {
    id_pago?: boolean
    id_usuario?: boolean
    monto?: boolean
    metodo_pago?: boolean
    estado_pago?: boolean
    fecha_pago?: boolean
  }

  export type pagosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_pago" | "id_usuario" | "monto" | "metodo_pago" | "estado_pago" | "fecha_pago", ExtArgs["result"]["pagos"]>
  export type pagosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | pagos$usuariosArgs<ExtArgs>
    registros?: boolean | pagos$registrosArgs<ExtArgs>
    _count?: boolean | PagosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type pagosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | pagos$usuariosArgs<ExtArgs>
  }
  export type pagosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | pagos$usuariosArgs<ExtArgs>
  }

  export type $pagosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pagos"
    objects: {
      usuarios: Prisma.$usuariosPayload<ExtArgs> | null
      registros: Prisma.$registrosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_pago: bigint
      id_usuario: bigint | null
      monto: Prisma.Decimal
      metodo_pago: string
      estado_pago: string | null
      fecha_pago: Date | null
    }, ExtArgs["result"]["pagos"]>
    composites: {}
  }

  type pagosGetPayload<S extends boolean | null | undefined | pagosDefaultArgs> = $Result.GetResult<Prisma.$pagosPayload, S>

  type pagosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pagosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagosCountAggregateInputType | true
    }

  export interface pagosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pagos'], meta: { name: 'pagos' } }
    /**
     * Find zero or one Pagos that matches the filter.
     * @param {pagosFindUniqueArgs} args - Arguments to find a Pagos
     * @example
     * // Get one Pagos
     * const pagos = await prisma.pagos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pagosFindUniqueArgs>(args: SelectSubset<T, pagosFindUniqueArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pagos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pagosFindUniqueOrThrowArgs} args - Arguments to find a Pagos
     * @example
     * // Get one Pagos
     * const pagos = await prisma.pagos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pagosFindUniqueOrThrowArgs>(args: SelectSubset<T, pagosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosFindFirstArgs} args - Arguments to find a Pagos
     * @example
     * // Get one Pagos
     * const pagos = await prisma.pagos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pagosFindFirstArgs>(args?: SelectSubset<T, pagosFindFirstArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pagos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosFindFirstOrThrowArgs} args - Arguments to find a Pagos
     * @example
     * // Get one Pagos
     * const pagos = await prisma.pagos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pagosFindFirstOrThrowArgs>(args?: SelectSubset<T, pagosFindFirstOrThrowArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagos
     * const pagos = await prisma.pagos.findMany()
     * 
     * // Get first 10 Pagos
     * const pagos = await prisma.pagos.findMany({ take: 10 })
     * 
     * // Only select the `id_pago`
     * const pagosWithId_pagoOnly = await prisma.pagos.findMany({ select: { id_pago: true } })
     * 
     */
    findMany<T extends pagosFindManyArgs>(args?: SelectSubset<T, pagosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pagos.
     * @param {pagosCreateArgs} args - Arguments to create a Pagos.
     * @example
     * // Create one Pagos
     * const Pagos = await prisma.pagos.create({
     *   data: {
     *     // ... data to create a Pagos
     *   }
     * })
     * 
     */
    create<T extends pagosCreateArgs>(args: SelectSubset<T, pagosCreateArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pagos.
     * @param {pagosCreateManyArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pagos = await prisma.pagos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pagosCreateManyArgs>(args?: SelectSubset<T, pagosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pagos and returns the data saved in the database.
     * @param {pagosCreateManyAndReturnArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pagos = await prisma.pagos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pagos and only return the `id_pago`
     * const pagosWithId_pagoOnly = await prisma.pagos.createManyAndReturn({
     *   select: { id_pago: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pagosCreateManyAndReturnArgs>(args?: SelectSubset<T, pagosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pagos.
     * @param {pagosDeleteArgs} args - Arguments to delete one Pagos.
     * @example
     * // Delete one Pagos
     * const Pagos = await prisma.pagos.delete({
     *   where: {
     *     // ... filter to delete one Pagos
     *   }
     * })
     * 
     */
    delete<T extends pagosDeleteArgs>(args: SelectSubset<T, pagosDeleteArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pagos.
     * @param {pagosUpdateArgs} args - Arguments to update one Pagos.
     * @example
     * // Update one Pagos
     * const pagos = await prisma.pagos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pagosUpdateArgs>(args: SelectSubset<T, pagosUpdateArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pagos.
     * @param {pagosDeleteManyArgs} args - Arguments to filter Pagos to delete.
     * @example
     * // Delete a few Pagos
     * const { count } = await prisma.pagos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pagosDeleteManyArgs>(args?: SelectSubset<T, pagosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagos
     * const pagos = await prisma.pagos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pagosUpdateManyArgs>(args: SelectSubset<T, pagosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos and returns the data updated in the database.
     * @param {pagosUpdateManyAndReturnArgs} args - Arguments to update many Pagos.
     * @example
     * // Update many Pagos
     * const pagos = await prisma.pagos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pagos and only return the `id_pago`
     * const pagosWithId_pagoOnly = await prisma.pagos.updateManyAndReturn({
     *   select: { id_pago: true },
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
    updateManyAndReturn<T extends pagosUpdateManyAndReturnArgs>(args: SelectSubset<T, pagosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pagos.
     * @param {pagosUpsertArgs} args - Arguments to update or create a Pagos.
     * @example
     * // Update or create a Pagos
     * const pagos = await prisma.pagos.upsert({
     *   create: {
     *     // ... data to create a Pagos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pagos we want to update
     *   }
     * })
     */
    upsert<T extends pagosUpsertArgs>(args: SelectSubset<T, pagosUpsertArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosCountArgs} args - Arguments to filter Pagos to count.
     * @example
     * // Count the number of Pagos
     * const count = await prisma.pagos.count({
     *   where: {
     *     // ... the filter for the Pagos we want to count
     *   }
     * })
    **/
    count<T extends pagosCountArgs>(
      args?: Subset<T, pagosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PagosAggregateArgs>(args: Subset<T, PagosAggregateArgs>): Prisma.PrismaPromise<GetPagosAggregateType<T>>

    /**
     * Group by Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagosGroupByArgs} args - Group by arguments.
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
      T extends pagosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pagosGroupByArgs['orderBy'] }
        : { orderBy?: pagosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, pagosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pagos model
   */
  readonly fields: pagosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pagos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pagosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarios<T extends pagos$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, pagos$usuariosArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    registros<T extends pagos$registrosArgs<ExtArgs> = {}>(args?: Subset<T, pagos$registrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the pagos model
   */
  interface pagosFieldRefs {
    readonly id_pago: FieldRef<"pagos", 'BigInt'>
    readonly id_usuario: FieldRef<"pagos", 'BigInt'>
    readonly monto: FieldRef<"pagos", 'Decimal'>
    readonly metodo_pago: FieldRef<"pagos", 'String'>
    readonly estado_pago: FieldRef<"pagos", 'String'>
    readonly fecha_pago: FieldRef<"pagos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * pagos findUnique
   */
  export type pagosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where: pagosWhereUniqueInput
  }

  /**
   * pagos findUniqueOrThrow
   */
  export type pagosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where: pagosWhereUniqueInput
  }

  /**
   * pagos findFirst
   */
  export type pagosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where?: pagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagos to fetch.
     */
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pagos.
     */
    cursor?: pagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pagos.
     */
    distinct?: PagosScalarFieldEnum | PagosScalarFieldEnum[]
  }

  /**
   * pagos findFirstOrThrow
   */
  export type pagosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where?: pagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagos to fetch.
     */
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pagos.
     */
    cursor?: pagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pagos.
     */
    distinct?: PagosScalarFieldEnum | PagosScalarFieldEnum[]
  }

  /**
   * pagos findMany
   */
  export type pagosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter, which pagos to fetch.
     */
    where?: pagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagos to fetch.
     */
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pagos.
     */
    cursor?: pagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagos.
     */
    skip?: number
    distinct?: PagosScalarFieldEnum | PagosScalarFieldEnum[]
  }

  /**
   * pagos create
   */
  export type pagosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * The data needed to create a pagos.
     */
    data: XOR<pagosCreateInput, pagosUncheckedCreateInput>
  }

  /**
   * pagos createMany
   */
  export type pagosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pagos.
     */
    data: pagosCreateManyInput | pagosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pagos createManyAndReturn
   */
  export type pagosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * The data used to create many pagos.
     */
    data: pagosCreateManyInput | pagosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * pagos update
   */
  export type pagosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * The data needed to update a pagos.
     */
    data: XOR<pagosUpdateInput, pagosUncheckedUpdateInput>
    /**
     * Choose, which pagos to update.
     */
    where: pagosWhereUniqueInput
  }

  /**
   * pagos updateMany
   */
  export type pagosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pagos.
     */
    data: XOR<pagosUpdateManyMutationInput, pagosUncheckedUpdateManyInput>
    /**
     * Filter which pagos to update
     */
    where?: pagosWhereInput
    /**
     * Limit how many pagos to update.
     */
    limit?: number
  }

  /**
   * pagos updateManyAndReturn
   */
  export type pagosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * The data used to update pagos.
     */
    data: XOR<pagosUpdateManyMutationInput, pagosUncheckedUpdateManyInput>
    /**
     * Filter which pagos to update
     */
    where?: pagosWhereInput
    /**
     * Limit how many pagos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * pagos upsert
   */
  export type pagosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * The filter to search for the pagos to update in case it exists.
     */
    where: pagosWhereUniqueInput
    /**
     * In case the pagos found by the `where` argument doesn't exist, create a new pagos with this data.
     */
    create: XOR<pagosCreateInput, pagosUncheckedCreateInput>
    /**
     * In case the pagos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pagosUpdateInput, pagosUncheckedUpdateInput>
  }

  /**
   * pagos delete
   */
  export type pagosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    /**
     * Filter which pagos to delete.
     */
    where: pagosWhereUniqueInput
  }

  /**
   * pagos deleteMany
   */
  export type pagosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pagos to delete
     */
    where?: pagosWhereInput
    /**
     * Limit how many pagos to delete.
     */
    limit?: number
  }

  /**
   * pagos.usuarios
   */
  export type pagos$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    where?: usuariosWhereInput
  }

  /**
   * pagos.registros
   */
  export type pagos$registrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    where?: registrosWhereInput
    orderBy?: registrosOrderByWithRelationInput | registrosOrderByWithRelationInput[]
    cursor?: registrosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * pagos without action
   */
  export type pagosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
  }


  /**
   * Model registros
   */

  export type AggregateRegistros = {
    _count: RegistrosCountAggregateOutputType | null
    _avg: RegistrosAvgAggregateOutputType | null
    _sum: RegistrosSumAggregateOutputType | null
    _min: RegistrosMinAggregateOutputType | null
    _max: RegistrosMaxAggregateOutputType | null
  }

  export type RegistrosAvgAggregateOutputType = {
    id_registro: number | null
    id_usuario: number | null
    id_evento: number | null
    id_pago: number | null
    cantidad: number | null
  }

  export type RegistrosSumAggregateOutputType = {
    id_registro: bigint | null
    id_usuario: bigint | null
    id_evento: bigint | null
    id_pago: bigint | null
    cantidad: number | null
  }

  export type RegistrosMinAggregateOutputType = {
    id_registro: bigint | null
    id_usuario: bigint | null
    id_evento: bigint | null
    id_pago: bigint | null
    cantidad: number | null
    fecha_registro: Date | null
  }

  export type RegistrosMaxAggregateOutputType = {
    id_registro: bigint | null
    id_usuario: bigint | null
    id_evento: bigint | null
    id_pago: bigint | null
    cantidad: number | null
    fecha_registro: Date | null
  }

  export type RegistrosCountAggregateOutputType = {
    id_registro: number
    id_usuario: number
    id_evento: number
    id_pago: number
    cantidad: number
    fecha_registro: number
    _all: number
  }


  export type RegistrosAvgAggregateInputType = {
    id_registro?: true
    id_usuario?: true
    id_evento?: true
    id_pago?: true
    cantidad?: true
  }

  export type RegistrosSumAggregateInputType = {
    id_registro?: true
    id_usuario?: true
    id_evento?: true
    id_pago?: true
    cantidad?: true
  }

  export type RegistrosMinAggregateInputType = {
    id_registro?: true
    id_usuario?: true
    id_evento?: true
    id_pago?: true
    cantidad?: true
    fecha_registro?: true
  }

  export type RegistrosMaxAggregateInputType = {
    id_registro?: true
    id_usuario?: true
    id_evento?: true
    id_pago?: true
    cantidad?: true
    fecha_registro?: true
  }

  export type RegistrosCountAggregateInputType = {
    id_registro?: true
    id_usuario?: true
    id_evento?: true
    id_pago?: true
    cantidad?: true
    fecha_registro?: true
    _all?: true
  }

  export type RegistrosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which registros to aggregate.
     */
    where?: registrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registros to fetch.
     */
    orderBy?: registrosOrderByWithRelationInput | registrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: registrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned registros
    **/
    _count?: true | RegistrosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegistrosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegistrosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrosMaxAggregateInputType
  }

  export type GetRegistrosAggregateType<T extends RegistrosAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistros]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistros[P]>
      : GetScalarType<T[P], AggregateRegistros[P]>
  }




  export type registrosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: registrosWhereInput
    orderBy?: registrosOrderByWithAggregationInput | registrosOrderByWithAggregationInput[]
    by: RegistrosScalarFieldEnum[] | RegistrosScalarFieldEnum
    having?: registrosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrosCountAggregateInputType | true
    _avg?: RegistrosAvgAggregateInputType
    _sum?: RegistrosSumAggregateInputType
    _min?: RegistrosMinAggregateInputType
    _max?: RegistrosMaxAggregateInputType
  }

  export type RegistrosGroupByOutputType = {
    id_registro: bigint
    id_usuario: bigint
    id_evento: bigint
    id_pago: bigint
    cantidad: number
    fecha_registro: Date | null
    _count: RegistrosCountAggregateOutputType | null
    _avg: RegistrosAvgAggregateOutputType | null
    _sum: RegistrosSumAggregateOutputType | null
    _min: RegistrosMinAggregateOutputType | null
    _max: RegistrosMaxAggregateOutputType | null
  }

  type GetRegistrosGroupByPayload<T extends registrosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrosGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrosGroupByOutputType[P]>
        }
      >
    >


  export type registrosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_registro?: boolean
    id_usuario?: boolean
    id_evento?: boolean
    id_pago?: boolean
    cantidad?: boolean
    fecha_registro?: boolean
    eventos?: boolean | eventosDefaultArgs<ExtArgs>
    pagos?: boolean | pagosDefaultArgs<ExtArgs>
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registros"]>

  export type registrosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_registro?: boolean
    id_usuario?: boolean
    id_evento?: boolean
    id_pago?: boolean
    cantidad?: boolean
    fecha_registro?: boolean
    eventos?: boolean | eventosDefaultArgs<ExtArgs>
    pagos?: boolean | pagosDefaultArgs<ExtArgs>
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registros"]>

  export type registrosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_registro?: boolean
    id_usuario?: boolean
    id_evento?: boolean
    id_pago?: boolean
    cantidad?: boolean
    fecha_registro?: boolean
    eventos?: boolean | eventosDefaultArgs<ExtArgs>
    pagos?: boolean | pagosDefaultArgs<ExtArgs>
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registros"]>

  export type registrosSelectScalar = {
    id_registro?: boolean
    id_usuario?: boolean
    id_evento?: boolean
    id_pago?: boolean
    cantidad?: boolean
    fecha_registro?: boolean
  }

  export type registrosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_registro" | "id_usuario" | "id_evento" | "id_pago" | "cantidad" | "fecha_registro", ExtArgs["result"]["registros"]>
  export type registrosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventos?: boolean | eventosDefaultArgs<ExtArgs>
    pagos?: boolean | pagosDefaultArgs<ExtArgs>
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
  }
  export type registrosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventos?: boolean | eventosDefaultArgs<ExtArgs>
    pagos?: boolean | pagosDefaultArgs<ExtArgs>
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
  }
  export type registrosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventos?: boolean | eventosDefaultArgs<ExtArgs>
    pagos?: boolean | pagosDefaultArgs<ExtArgs>
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
  }

  export type $registrosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "registros"
    objects: {
      eventos: Prisma.$eventosPayload<ExtArgs>
      pagos: Prisma.$pagosPayload<ExtArgs>
      usuarios: Prisma.$usuariosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_registro: bigint
      id_usuario: bigint
      id_evento: bigint
      id_pago: bigint
      cantidad: number
      fecha_registro: Date | null
    }, ExtArgs["result"]["registros"]>
    composites: {}
  }

  type registrosGetPayload<S extends boolean | null | undefined | registrosDefaultArgs> = $Result.GetResult<Prisma.$registrosPayload, S>

  type registrosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<registrosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrosCountAggregateInputType | true
    }

  export interface registrosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['registros'], meta: { name: 'registros' } }
    /**
     * Find zero or one Registros that matches the filter.
     * @param {registrosFindUniqueArgs} args - Arguments to find a Registros
     * @example
     * // Get one Registros
     * const registros = await prisma.registros.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends registrosFindUniqueArgs>(args: SelectSubset<T, registrosFindUniqueArgs<ExtArgs>>): Prisma__registrosClient<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Registros that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {registrosFindUniqueOrThrowArgs} args - Arguments to find a Registros
     * @example
     * // Get one Registros
     * const registros = await prisma.registros.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends registrosFindUniqueOrThrowArgs>(args: SelectSubset<T, registrosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__registrosClient<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrosFindFirstArgs} args - Arguments to find a Registros
     * @example
     * // Get one Registros
     * const registros = await prisma.registros.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends registrosFindFirstArgs>(args?: SelectSubset<T, registrosFindFirstArgs<ExtArgs>>): Prisma__registrosClient<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registros that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrosFindFirstOrThrowArgs} args - Arguments to find a Registros
     * @example
     * // Get one Registros
     * const registros = await prisma.registros.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends registrosFindFirstOrThrowArgs>(args?: SelectSubset<T, registrosFindFirstOrThrowArgs<ExtArgs>>): Prisma__registrosClient<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Registros
     * const registros = await prisma.registros.findMany()
     * 
     * // Get first 10 Registros
     * const registros = await prisma.registros.findMany({ take: 10 })
     * 
     * // Only select the `id_registro`
     * const registrosWithId_registroOnly = await prisma.registros.findMany({ select: { id_registro: true } })
     * 
     */
    findMany<T extends registrosFindManyArgs>(args?: SelectSubset<T, registrosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Registros.
     * @param {registrosCreateArgs} args - Arguments to create a Registros.
     * @example
     * // Create one Registros
     * const Registros = await prisma.registros.create({
     *   data: {
     *     // ... data to create a Registros
     *   }
     * })
     * 
     */
    create<T extends registrosCreateArgs>(args: SelectSubset<T, registrosCreateArgs<ExtArgs>>): Prisma__registrosClient<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Registros.
     * @param {registrosCreateManyArgs} args - Arguments to create many Registros.
     * @example
     * // Create many Registros
     * const registros = await prisma.registros.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends registrosCreateManyArgs>(args?: SelectSubset<T, registrosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Registros and returns the data saved in the database.
     * @param {registrosCreateManyAndReturnArgs} args - Arguments to create many Registros.
     * @example
     * // Create many Registros
     * const registros = await prisma.registros.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Registros and only return the `id_registro`
     * const registrosWithId_registroOnly = await prisma.registros.createManyAndReturn({
     *   select: { id_registro: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends registrosCreateManyAndReturnArgs>(args?: SelectSubset<T, registrosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Registros.
     * @param {registrosDeleteArgs} args - Arguments to delete one Registros.
     * @example
     * // Delete one Registros
     * const Registros = await prisma.registros.delete({
     *   where: {
     *     // ... filter to delete one Registros
     *   }
     * })
     * 
     */
    delete<T extends registrosDeleteArgs>(args: SelectSubset<T, registrosDeleteArgs<ExtArgs>>): Prisma__registrosClient<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Registros.
     * @param {registrosUpdateArgs} args - Arguments to update one Registros.
     * @example
     * // Update one Registros
     * const registros = await prisma.registros.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends registrosUpdateArgs>(args: SelectSubset<T, registrosUpdateArgs<ExtArgs>>): Prisma__registrosClient<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Registros.
     * @param {registrosDeleteManyArgs} args - Arguments to filter Registros to delete.
     * @example
     * // Delete a few Registros
     * const { count } = await prisma.registros.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends registrosDeleteManyArgs>(args?: SelectSubset<T, registrosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Registros
     * const registros = await prisma.registros.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends registrosUpdateManyArgs>(args: SelectSubset<T, registrosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registros and returns the data updated in the database.
     * @param {registrosUpdateManyAndReturnArgs} args - Arguments to update many Registros.
     * @example
     * // Update many Registros
     * const registros = await prisma.registros.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Registros and only return the `id_registro`
     * const registrosWithId_registroOnly = await prisma.registros.updateManyAndReturn({
     *   select: { id_registro: true },
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
    updateManyAndReturn<T extends registrosUpdateManyAndReturnArgs>(args: SelectSubset<T, registrosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Registros.
     * @param {registrosUpsertArgs} args - Arguments to update or create a Registros.
     * @example
     * // Update or create a Registros
     * const registros = await prisma.registros.upsert({
     *   create: {
     *     // ... data to create a Registros
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Registros we want to update
     *   }
     * })
     */
    upsert<T extends registrosUpsertArgs>(args: SelectSubset<T, registrosUpsertArgs<ExtArgs>>): Prisma__registrosClient<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Registros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrosCountArgs} args - Arguments to filter Registros to count.
     * @example
     * // Count the number of Registros
     * const count = await prisma.registros.count({
     *   where: {
     *     // ... the filter for the Registros we want to count
     *   }
     * })
    **/
    count<T extends registrosCountArgs>(
      args?: Subset<T, registrosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Registros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RegistrosAggregateArgs>(args: Subset<T, RegistrosAggregateArgs>): Prisma.PrismaPromise<GetRegistrosAggregateType<T>>

    /**
     * Group by Registros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrosGroupByArgs} args - Group by arguments.
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
      T extends registrosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: registrosGroupByArgs['orderBy'] }
        : { orderBy?: registrosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, registrosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the registros model
   */
  readonly fields: registrosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for registros.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__registrosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eventos<T extends eventosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, eventosDefaultArgs<ExtArgs>>): Prisma__eventosClient<$Result.GetResult<Prisma.$eventosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pagos<T extends pagosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, pagosDefaultArgs<ExtArgs>>): Prisma__pagosClient<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuarios<T extends usuariosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usuariosDefaultArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the registros model
   */
  interface registrosFieldRefs {
    readonly id_registro: FieldRef<"registros", 'BigInt'>
    readonly id_usuario: FieldRef<"registros", 'BigInt'>
    readonly id_evento: FieldRef<"registros", 'BigInt'>
    readonly id_pago: FieldRef<"registros", 'BigInt'>
    readonly cantidad: FieldRef<"registros", 'Int'>
    readonly fecha_registro: FieldRef<"registros", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * registros findUnique
   */
  export type registrosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * Filter, which registros to fetch.
     */
    where: registrosWhereUniqueInput
  }

  /**
   * registros findUniqueOrThrow
   */
  export type registrosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * Filter, which registros to fetch.
     */
    where: registrosWhereUniqueInput
  }

  /**
   * registros findFirst
   */
  export type registrosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * Filter, which registros to fetch.
     */
    where?: registrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registros to fetch.
     */
    orderBy?: registrosOrderByWithRelationInput | registrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for registros.
     */
    cursor?: registrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of registros.
     */
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * registros findFirstOrThrow
   */
  export type registrosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * Filter, which registros to fetch.
     */
    where?: registrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registros to fetch.
     */
    orderBy?: registrosOrderByWithRelationInput | registrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for registros.
     */
    cursor?: registrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of registros.
     */
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * registros findMany
   */
  export type registrosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * Filter, which registros to fetch.
     */
    where?: registrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registros to fetch.
     */
    orderBy?: registrosOrderByWithRelationInput | registrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing registros.
     */
    cursor?: registrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registros.
     */
    skip?: number
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * registros create
   */
  export type registrosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * The data needed to create a registros.
     */
    data: XOR<registrosCreateInput, registrosUncheckedCreateInput>
  }

  /**
   * registros createMany
   */
  export type registrosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many registros.
     */
    data: registrosCreateManyInput | registrosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * registros createManyAndReturn
   */
  export type registrosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * The data used to create many registros.
     */
    data: registrosCreateManyInput | registrosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * registros update
   */
  export type registrosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * The data needed to update a registros.
     */
    data: XOR<registrosUpdateInput, registrosUncheckedUpdateInput>
    /**
     * Choose, which registros to update.
     */
    where: registrosWhereUniqueInput
  }

  /**
   * registros updateMany
   */
  export type registrosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update registros.
     */
    data: XOR<registrosUpdateManyMutationInput, registrosUncheckedUpdateManyInput>
    /**
     * Filter which registros to update
     */
    where?: registrosWhereInput
    /**
     * Limit how many registros to update.
     */
    limit?: number
  }

  /**
   * registros updateManyAndReturn
   */
  export type registrosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * The data used to update registros.
     */
    data: XOR<registrosUpdateManyMutationInput, registrosUncheckedUpdateManyInput>
    /**
     * Filter which registros to update
     */
    where?: registrosWhereInput
    /**
     * Limit how many registros to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * registros upsert
   */
  export type registrosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * The filter to search for the registros to update in case it exists.
     */
    where: registrosWhereUniqueInput
    /**
     * In case the registros found by the `where` argument doesn't exist, create a new registros with this data.
     */
    create: XOR<registrosCreateInput, registrosUncheckedCreateInput>
    /**
     * In case the registros was found with the provided `where` argument, update it with this data.
     */
    update: XOR<registrosUpdateInput, registrosUncheckedUpdateInput>
  }

  /**
   * registros delete
   */
  export type registrosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    /**
     * Filter which registros to delete.
     */
    where: registrosWhereUniqueInput
  }

  /**
   * registros deleteMany
   */
  export type registrosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which registros to delete
     */
    where?: registrosWhereInput
    /**
     * Limit how many registros to delete.
     */
    limit?: number
  }

  /**
   * registros without action
   */
  export type registrosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
  }


  /**
   * Model usuarios
   */

  export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  export type UsuariosAvgAggregateOutputType = {
    id_usuario: number | null
  }

  export type UsuariosSumAggregateOutputType = {
    id_usuario: bigint | null
  }

  export type UsuariosMinAggregateOutputType = {
    id_usuario: bigint | null
    nombre: string | null
    apellidos: string | null
    foto_perfil: string | null
    correo: string | null
    contrasena: string | null
    google_id: string | null
    activo: boolean | null
    rol: string | null
    creado_en: Date | null
  }

  export type UsuariosMaxAggregateOutputType = {
    id_usuario: bigint | null
    nombre: string | null
    apellidos: string | null
    foto_perfil: string | null
    correo: string | null
    contrasena: string | null
    google_id: string | null
    activo: boolean | null
    rol: string | null
    creado_en: Date | null
  }

  export type UsuariosCountAggregateOutputType = {
    id_usuario: number
    nombre: number
    apellidos: number
    foto_perfil: number
    correo: number
    contrasena: number
    google_id: number
    activo: number
    rol: number
    creado_en: number
    _all: number
  }


  export type UsuariosAvgAggregateInputType = {
    id_usuario?: true
  }

  export type UsuariosSumAggregateInputType = {
    id_usuario?: true
  }

  export type UsuariosMinAggregateInputType = {
    id_usuario?: true
    nombre?: true
    apellidos?: true
    foto_perfil?: true
    correo?: true
    contrasena?: true
    google_id?: true
    activo?: true
    rol?: true
    creado_en?: true
  }

  export type UsuariosMaxAggregateInputType = {
    id_usuario?: true
    nombre?: true
    apellidos?: true
    foto_perfil?: true
    correo?: true
    contrasena?: true
    google_id?: true
    activo?: true
    rol?: true
    creado_en?: true
  }

  export type UsuariosCountAggregateInputType = {
    id_usuario?: true
    nombre?: true
    apellidos?: true
    foto_perfil?: true
    correo?: true
    contrasena?: true
    google_id?: true
    activo?: true
    rol?: true
    creado_en?: true
    _all?: true
  }

  export type UsuariosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to aggregate.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned usuarios
    **/
    _count?: true | UsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuariosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuariosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuariosMaxAggregateInputType
  }

  export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuarios[P]>
      : GetScalarType<T[P], AggregateUsuarios[P]>
  }




  export type usuariosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuariosWhereInput
    orderBy?: usuariosOrderByWithAggregationInput | usuariosOrderByWithAggregationInput[]
    by: UsuariosScalarFieldEnum[] | UsuariosScalarFieldEnum
    having?: usuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuariosCountAggregateInputType | true
    _avg?: UsuariosAvgAggregateInputType
    _sum?: UsuariosSumAggregateInputType
    _min?: UsuariosMinAggregateInputType
    _max?: UsuariosMaxAggregateInputType
  }

  export type UsuariosGroupByOutputType = {
    id_usuario: bigint
    nombre: string | null
    apellidos: string | null
    foto_perfil: string | null
    correo: string
    contrasena: string | null
    google_id: string | null
    activo: boolean | null
    rol: string | null
    creado_en: Date | null
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  type GetUsuariosGroupByPayload<T extends usuariosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
        }
      >
    >


  export type usuariosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_usuario?: boolean
    nombre?: boolean
    apellidos?: boolean
    foto_perfil?: boolean
    correo?: boolean
    contrasena?: boolean
    google_id?: boolean
    activo?: boolean
    rol?: boolean
    creado_en?: boolean
    pagos?: boolean | usuarios$pagosArgs<ExtArgs>
    registros?: boolean | usuarios$registrosArgs<ExtArgs>
    _count?: boolean | UsuariosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_usuario?: boolean
    nombre?: boolean
    apellidos?: boolean
    foto_perfil?: boolean
    correo?: boolean
    contrasena?: boolean
    google_id?: boolean
    activo?: boolean
    rol?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_usuario?: boolean
    nombre?: boolean
    apellidos?: boolean
    foto_perfil?: boolean
    correo?: boolean
    contrasena?: boolean
    google_id?: boolean
    activo?: boolean
    rol?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectScalar = {
    id_usuario?: boolean
    nombre?: boolean
    apellidos?: boolean
    foto_perfil?: boolean
    correo?: boolean
    contrasena?: boolean
    google_id?: boolean
    activo?: boolean
    rol?: boolean
    creado_en?: boolean
  }

  export type usuariosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_usuario" | "nombre" | "apellidos" | "foto_perfil" | "correo" | "contrasena" | "google_id" | "activo" | "rol" | "creado_en", ExtArgs["result"]["usuarios"]>
  export type usuariosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pagos?: boolean | usuarios$pagosArgs<ExtArgs>
    registros?: boolean | usuarios$registrosArgs<ExtArgs>
    _count?: boolean | UsuariosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usuariosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usuariosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usuariosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuarios"
    objects: {
      pagos: Prisma.$pagosPayload<ExtArgs>[]
      registros: Prisma.$registrosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_usuario: bigint
      nombre: string | null
      apellidos: string | null
      foto_perfil: string | null
      correo: string
      contrasena: string | null
      google_id: string | null
      activo: boolean | null
      rol: string | null
      creado_en: Date | null
    }, ExtArgs["result"]["usuarios"]>
    composites: {}
  }

  type usuariosGetPayload<S extends boolean | null | undefined | usuariosDefaultArgs> = $Result.GetResult<Prisma.$usuariosPayload, S>

  type usuariosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuariosCountAggregateInputType | true
    }

  export interface usuariosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['usuarios'], meta: { name: 'usuarios' } }
    /**
     * Find zero or one Usuarios that matches the filter.
     * @param {usuariosFindUniqueArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuariosFindUniqueArgs>(args: SelectSubset<T, usuariosFindUniqueArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuariosFindUniqueOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuariosFindUniqueOrThrowArgs>(args: SelectSubset<T, usuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuariosFindFirstArgs>(args?: SelectSubset<T, usuariosFindFirstArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuariosFindFirstOrThrowArgs>(args?: SelectSubset<T, usuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuarios.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuarios.findMany({ take: 10 })
     * 
     * // Only select the `id_usuario`
     * const usuariosWithId_usuarioOnly = await prisma.usuarios.findMany({ select: { id_usuario: true } })
     * 
     */
    findMany<T extends usuariosFindManyArgs>(args?: SelectSubset<T, usuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuarios.
     * @param {usuariosCreateArgs} args - Arguments to create a Usuarios.
     * @example
     * // Create one Usuarios
     * const Usuarios = await prisma.usuarios.create({
     *   data: {
     *     // ... data to create a Usuarios
     *   }
     * })
     * 
     */
    create<T extends usuariosCreateArgs>(args: SelectSubset<T, usuariosCreateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {usuariosCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usuariosCreateManyArgs>(args?: SelectSubset<T, usuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {usuariosCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id_usuario`
     * const usuariosWithId_usuarioOnly = await prisma.usuarios.createManyAndReturn({
     *   select: { id_usuario: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usuariosCreateManyAndReturnArgs>(args?: SelectSubset<T, usuariosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuarios.
     * @param {usuariosDeleteArgs} args - Arguments to delete one Usuarios.
     * @example
     * // Delete one Usuarios
     * const Usuarios = await prisma.usuarios.delete({
     *   where: {
     *     // ... filter to delete one Usuarios
     *   }
     * })
     * 
     */
    delete<T extends usuariosDeleteArgs>(args: SelectSubset<T, usuariosDeleteArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuarios.
     * @param {usuariosUpdateArgs} args - Arguments to update one Usuarios.
     * @example
     * // Update one Usuarios
     * const usuarios = await prisma.usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usuariosUpdateArgs>(args: SelectSubset<T, usuariosUpdateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {usuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usuariosDeleteManyArgs>(args?: SelectSubset<T, usuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usuariosUpdateManyArgs>(args: SelectSubset<T, usuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {usuariosUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id_usuario`
     * const usuariosWithId_usuarioOnly = await prisma.usuarios.updateManyAndReturn({
     *   select: { id_usuario: true },
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
    updateManyAndReturn<T extends usuariosUpdateManyAndReturnArgs>(args: SelectSubset<T, usuariosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuarios.
     * @param {usuariosUpsertArgs} args - Arguments to update or create a Usuarios.
     * @example
     * // Update or create a Usuarios
     * const usuarios = await prisma.usuarios.upsert({
     *   create: {
     *     // ... data to create a Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios we want to update
     *   }
     * })
     */
    upsert<T extends usuariosUpsertArgs>(args: SelectSubset<T, usuariosUpsertArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuarios.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuariosCountArgs>(
      args?: Subset<T, usuariosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuariosAggregateArgs>(args: Subset<T, UsuariosAggregateArgs>): Prisma.PrismaPromise<GetUsuariosAggregateType<T>>

    /**
     * Group by Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosGroupByArgs} args - Group by arguments.
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
      T extends usuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usuariosGroupByArgs['orderBy'] }
        : { orderBy?: usuariosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the usuarios model
   */
  readonly fields: usuariosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for usuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usuariosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pagos<T extends usuarios$pagosArgs<ExtArgs> = {}>(args?: Subset<T, usuarios$pagosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registros<T extends usuarios$registrosArgs<ExtArgs> = {}>(args?: Subset<T, usuarios$registrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the usuarios model
   */
  interface usuariosFieldRefs {
    readonly id_usuario: FieldRef<"usuarios", 'BigInt'>
    readonly nombre: FieldRef<"usuarios", 'String'>
    readonly apellidos: FieldRef<"usuarios", 'String'>
    readonly foto_perfil: FieldRef<"usuarios", 'String'>
    readonly correo: FieldRef<"usuarios", 'String'>
    readonly contrasena: FieldRef<"usuarios", 'String'>
    readonly google_id: FieldRef<"usuarios", 'String'>
    readonly activo: FieldRef<"usuarios", 'Boolean'>
    readonly rol: FieldRef<"usuarios", 'String'>
    readonly creado_en: FieldRef<"usuarios", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * usuarios findUnique
   */
  export type usuariosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findUniqueOrThrow
   */
  export type usuariosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findFirst
   */
  export type usuariosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findFirstOrThrow
   */
  export type usuariosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findMany
   */
  export type usuariosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios create
   */
  export type usuariosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The data needed to create a usuarios.
     */
    data: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
  }

  /**
   * usuarios createMany
   */
  export type usuariosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios createManyAndReturn
   */
  export type usuariosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios update
   */
  export type usuariosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The data needed to update a usuarios.
     */
    data: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
    /**
     * Choose, which usuarios to update.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios updateMany
   */
  export type usuariosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuarios updateManyAndReturn
   */
  export type usuariosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuarios upsert
   */
  export type usuariosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The filter to search for the usuarios to update in case it exists.
     */
    where: usuariosWhereUniqueInput
    /**
     * In case the usuarios found by the `where` argument doesn't exist, create a new usuarios with this data.
     */
    create: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
    /**
     * In case the usuarios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
  }

  /**
   * usuarios delete
   */
  export type usuariosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter which usuarios to delete.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios deleteMany
   */
  export type usuariosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number
  }

  /**
   * usuarios.pagos
   */
  export type usuarios$pagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagos
     */
    select?: pagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagos
     */
    omit?: pagosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagosInclude<ExtArgs> | null
    where?: pagosWhereInput
    orderBy?: pagosOrderByWithRelationInput | pagosOrderByWithRelationInput[]
    cursor?: pagosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagosScalarFieldEnum | PagosScalarFieldEnum[]
  }

  /**
   * usuarios.registros
   */
  export type usuarios$registrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registros
     */
    select?: registrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registros
     */
    omit?: registrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrosInclude<ExtArgs> | null
    where?: registrosWhereInput
    orderBy?: registrosOrderByWithRelationInput | registrosOrderByWithRelationInput[]
    cursor?: registrosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * usuarios without action
   */
  export type usuariosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
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


  export const CategoriasScalarFieldEnum: {
    id_categoria: 'id_categoria',
    nombre: 'nombre',
    descripcion: 'descripcion',
    creado_categoria: 'creado_categoria'
  };

  export type CategoriasScalarFieldEnum = (typeof CategoriasScalarFieldEnum)[keyof typeof CategoriasScalarFieldEnum]


  export const EventosScalarFieldEnum: {
    id_evento: 'id_evento',
    titulo: 'titulo',
    descripcion: 'descripcion',
    ubicacion: 'ubicacion',
    fecha_inicio: 'fecha_inicio',
    fecha_fin: 'fecha_fin',
    precio: 'precio',
    imagen: 'imagen',
    id_categoria: 'id_categoria',
    creado_evento: 'creado_evento',
    actualizado_evento: 'actualizado_evento'
  };

  export type EventosScalarFieldEnum = (typeof EventosScalarFieldEnum)[keyof typeof EventosScalarFieldEnum]


  export const PagosScalarFieldEnum: {
    id_pago: 'id_pago',
    id_usuario: 'id_usuario',
    monto: 'monto',
    metodo_pago: 'metodo_pago',
    estado_pago: 'estado_pago',
    fecha_pago: 'fecha_pago'
  };

  export type PagosScalarFieldEnum = (typeof PagosScalarFieldEnum)[keyof typeof PagosScalarFieldEnum]


  export const RegistrosScalarFieldEnum: {
    id_registro: 'id_registro',
    id_usuario: 'id_usuario',
    id_evento: 'id_evento',
    id_pago: 'id_pago',
    cantidad: 'cantidad',
    fecha_registro: 'fecha_registro'
  };

  export type RegistrosScalarFieldEnum = (typeof RegistrosScalarFieldEnum)[keyof typeof RegistrosScalarFieldEnum]


  export const UsuariosScalarFieldEnum: {
    id_usuario: 'id_usuario',
    nombre: 'nombre',
    apellidos: 'apellidos',
    foto_perfil: 'foto_perfil',
    correo: 'correo',
    contrasena: 'contrasena',
    google_id: 'google_id',
    activo: 'activo',
    rol: 'rol',
    creado_en: 'creado_en'
  };

  export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


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


  export type categoriasWhereInput = {
    AND?: categoriasWhereInput | categoriasWhereInput[]
    OR?: categoriasWhereInput[]
    NOT?: categoriasWhereInput | categoriasWhereInput[]
    id_categoria?: BigIntFilter<"categorias"> | bigint | number
    nombre?: StringFilter<"categorias"> | string
    descripcion?: StringNullableFilter<"categorias"> | string | null
    creado_categoria?: DateTimeNullableFilter<"categorias"> | Date | string | null
    eventos?: EventosListRelationFilter
  }

  export type categoriasOrderByWithRelationInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    creado_categoria?: SortOrderInput | SortOrder
    eventos?: eventosOrderByRelationAggregateInput
  }

  export type categoriasWhereUniqueInput = Prisma.AtLeast<{
    id_categoria?: bigint | number
    nombre?: string
    AND?: categoriasWhereInput | categoriasWhereInput[]
    OR?: categoriasWhereInput[]
    NOT?: categoriasWhereInput | categoriasWhereInput[]
    descripcion?: StringNullableFilter<"categorias"> | string | null
    creado_categoria?: DateTimeNullableFilter<"categorias"> | Date | string | null
    eventos?: EventosListRelationFilter
  }, "id_categoria" | "nombre">

  export type categoriasOrderByWithAggregationInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    creado_categoria?: SortOrderInput | SortOrder
    _count?: categoriasCountOrderByAggregateInput
    _avg?: categoriasAvgOrderByAggregateInput
    _max?: categoriasMaxOrderByAggregateInput
    _min?: categoriasMinOrderByAggregateInput
    _sum?: categoriasSumOrderByAggregateInput
  }

  export type categoriasScalarWhereWithAggregatesInput = {
    AND?: categoriasScalarWhereWithAggregatesInput | categoriasScalarWhereWithAggregatesInput[]
    OR?: categoriasScalarWhereWithAggregatesInput[]
    NOT?: categoriasScalarWhereWithAggregatesInput | categoriasScalarWhereWithAggregatesInput[]
    id_categoria?: BigIntWithAggregatesFilter<"categorias"> | bigint | number
    nombre?: StringWithAggregatesFilter<"categorias"> | string
    descripcion?: StringNullableWithAggregatesFilter<"categorias"> | string | null
    creado_categoria?: DateTimeNullableWithAggregatesFilter<"categorias"> | Date | string | null
  }

  export type eventosWhereInput = {
    AND?: eventosWhereInput | eventosWhereInput[]
    OR?: eventosWhereInput[]
    NOT?: eventosWhereInput | eventosWhereInput[]
    id_evento?: BigIntFilter<"eventos"> | bigint | number
    titulo?: StringFilter<"eventos"> | string
    descripcion?: StringNullableFilter<"eventos"> | string | null
    ubicacion?: StringNullableFilter<"eventos"> | string | null
    fecha_inicio?: DateTimeFilter<"eventos"> | Date | string
    fecha_fin?: DateTimeFilter<"eventos"> | Date | string
    precio?: DecimalNullableFilter<"eventos"> | Decimal | DecimalJsLike | number | string | null
    imagen?: StringNullableFilter<"eventos"> | string | null
    id_categoria?: BigIntFilter<"eventos"> | bigint | number
    creado_evento?: DateTimeNullableFilter<"eventos"> | Date | string | null
    actualizado_evento?: DateTimeNullableFilter<"eventos"> | Date | string | null
    categorias?: XOR<CategoriasScalarRelationFilter, categoriasWhereInput>
    registros?: RegistrosListRelationFilter
  }

  export type eventosOrderByWithRelationInput = {
    id_evento?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    ubicacion?: SortOrderInput | SortOrder
    fecha_inicio?: SortOrder
    fecha_fin?: SortOrder
    precio?: SortOrderInput | SortOrder
    imagen?: SortOrderInput | SortOrder
    id_categoria?: SortOrder
    creado_evento?: SortOrderInput | SortOrder
    actualizado_evento?: SortOrderInput | SortOrder
    categorias?: categoriasOrderByWithRelationInput
    registros?: registrosOrderByRelationAggregateInput
  }

  export type eventosWhereUniqueInput = Prisma.AtLeast<{
    id_evento?: bigint | number
    AND?: eventosWhereInput | eventosWhereInput[]
    OR?: eventosWhereInput[]
    NOT?: eventosWhereInput | eventosWhereInput[]
    titulo?: StringFilter<"eventos"> | string
    descripcion?: StringNullableFilter<"eventos"> | string | null
    ubicacion?: StringNullableFilter<"eventos"> | string | null
    fecha_inicio?: DateTimeFilter<"eventos"> | Date | string
    fecha_fin?: DateTimeFilter<"eventos"> | Date | string
    precio?: DecimalNullableFilter<"eventos"> | Decimal | DecimalJsLike | number | string | null
    imagen?: StringNullableFilter<"eventos"> | string | null
    id_categoria?: BigIntFilter<"eventos"> | bigint | number
    creado_evento?: DateTimeNullableFilter<"eventos"> | Date | string | null
    actualizado_evento?: DateTimeNullableFilter<"eventos"> | Date | string | null
    categorias?: XOR<CategoriasScalarRelationFilter, categoriasWhereInput>
    registros?: RegistrosListRelationFilter
  }, "id_evento">

  export type eventosOrderByWithAggregationInput = {
    id_evento?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    ubicacion?: SortOrderInput | SortOrder
    fecha_inicio?: SortOrder
    fecha_fin?: SortOrder
    precio?: SortOrderInput | SortOrder
    imagen?: SortOrderInput | SortOrder
    id_categoria?: SortOrder
    creado_evento?: SortOrderInput | SortOrder
    actualizado_evento?: SortOrderInput | SortOrder
    _count?: eventosCountOrderByAggregateInput
    _avg?: eventosAvgOrderByAggregateInput
    _max?: eventosMaxOrderByAggregateInput
    _min?: eventosMinOrderByAggregateInput
    _sum?: eventosSumOrderByAggregateInput
  }

  export type eventosScalarWhereWithAggregatesInput = {
    AND?: eventosScalarWhereWithAggregatesInput | eventosScalarWhereWithAggregatesInput[]
    OR?: eventosScalarWhereWithAggregatesInput[]
    NOT?: eventosScalarWhereWithAggregatesInput | eventosScalarWhereWithAggregatesInput[]
    id_evento?: BigIntWithAggregatesFilter<"eventos"> | bigint | number
    titulo?: StringWithAggregatesFilter<"eventos"> | string
    descripcion?: StringNullableWithAggregatesFilter<"eventos"> | string | null
    ubicacion?: StringNullableWithAggregatesFilter<"eventos"> | string | null
    fecha_inicio?: DateTimeWithAggregatesFilter<"eventos"> | Date | string
    fecha_fin?: DateTimeWithAggregatesFilter<"eventos"> | Date | string
    precio?: DecimalNullableWithAggregatesFilter<"eventos"> | Decimal | DecimalJsLike | number | string | null
    imagen?: StringNullableWithAggregatesFilter<"eventos"> | string | null
    id_categoria?: BigIntWithAggregatesFilter<"eventos"> | bigint | number
    creado_evento?: DateTimeNullableWithAggregatesFilter<"eventos"> | Date | string | null
    actualizado_evento?: DateTimeNullableWithAggregatesFilter<"eventos"> | Date | string | null
  }

  export type pagosWhereInput = {
    AND?: pagosWhereInput | pagosWhereInput[]
    OR?: pagosWhereInput[]
    NOT?: pagosWhereInput | pagosWhereInput[]
    id_pago?: BigIntFilter<"pagos"> | bigint | number
    id_usuario?: BigIntNullableFilter<"pagos"> | bigint | number | null
    monto?: DecimalFilter<"pagos"> | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFilter<"pagos"> | string
    estado_pago?: StringNullableFilter<"pagos"> | string | null
    fecha_pago?: DateTimeNullableFilter<"pagos"> | Date | string | null
    usuarios?: XOR<UsuariosNullableScalarRelationFilter, usuariosWhereInput> | null
    registros?: RegistrosListRelationFilter
  }

  export type pagosOrderByWithRelationInput = {
    id_pago?: SortOrder
    id_usuario?: SortOrderInput | SortOrder
    monto?: SortOrder
    metodo_pago?: SortOrder
    estado_pago?: SortOrderInput | SortOrder
    fecha_pago?: SortOrderInput | SortOrder
    usuarios?: usuariosOrderByWithRelationInput
    registros?: registrosOrderByRelationAggregateInput
  }

  export type pagosWhereUniqueInput = Prisma.AtLeast<{
    id_pago?: bigint | number
    AND?: pagosWhereInput | pagosWhereInput[]
    OR?: pagosWhereInput[]
    NOT?: pagosWhereInput | pagosWhereInput[]
    id_usuario?: BigIntNullableFilter<"pagos"> | bigint | number | null
    monto?: DecimalFilter<"pagos"> | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFilter<"pagos"> | string
    estado_pago?: StringNullableFilter<"pagos"> | string | null
    fecha_pago?: DateTimeNullableFilter<"pagos"> | Date | string | null
    usuarios?: XOR<UsuariosNullableScalarRelationFilter, usuariosWhereInput> | null
    registros?: RegistrosListRelationFilter
  }, "id_pago">

  export type pagosOrderByWithAggregationInput = {
    id_pago?: SortOrder
    id_usuario?: SortOrderInput | SortOrder
    monto?: SortOrder
    metodo_pago?: SortOrder
    estado_pago?: SortOrderInput | SortOrder
    fecha_pago?: SortOrderInput | SortOrder
    _count?: pagosCountOrderByAggregateInput
    _avg?: pagosAvgOrderByAggregateInput
    _max?: pagosMaxOrderByAggregateInput
    _min?: pagosMinOrderByAggregateInput
    _sum?: pagosSumOrderByAggregateInput
  }

  export type pagosScalarWhereWithAggregatesInput = {
    AND?: pagosScalarWhereWithAggregatesInput | pagosScalarWhereWithAggregatesInput[]
    OR?: pagosScalarWhereWithAggregatesInput[]
    NOT?: pagosScalarWhereWithAggregatesInput | pagosScalarWhereWithAggregatesInput[]
    id_pago?: BigIntWithAggregatesFilter<"pagos"> | bigint | number
    id_usuario?: BigIntNullableWithAggregatesFilter<"pagos"> | bigint | number | null
    monto?: DecimalWithAggregatesFilter<"pagos"> | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringWithAggregatesFilter<"pagos"> | string
    estado_pago?: StringNullableWithAggregatesFilter<"pagos"> | string | null
    fecha_pago?: DateTimeNullableWithAggregatesFilter<"pagos"> | Date | string | null
  }

  export type registrosWhereInput = {
    AND?: registrosWhereInput | registrosWhereInput[]
    OR?: registrosWhereInput[]
    NOT?: registrosWhereInput | registrosWhereInput[]
    id_registro?: BigIntFilter<"registros"> | bigint | number
    id_usuario?: BigIntFilter<"registros"> | bigint | number
    id_evento?: BigIntFilter<"registros"> | bigint | number
    id_pago?: BigIntFilter<"registros"> | bigint | number
    cantidad?: IntFilter<"registros"> | number
    fecha_registro?: DateTimeNullableFilter<"registros"> | Date | string | null
    eventos?: XOR<EventosScalarRelationFilter, eventosWhereInput>
    pagos?: XOR<PagosScalarRelationFilter, pagosWhereInput>
    usuarios?: XOR<UsuariosScalarRelationFilter, usuariosWhereInput>
  }

  export type registrosOrderByWithRelationInput = {
    id_registro?: SortOrder
    id_usuario?: SortOrder
    id_evento?: SortOrder
    id_pago?: SortOrder
    cantidad?: SortOrder
    fecha_registro?: SortOrderInput | SortOrder
    eventos?: eventosOrderByWithRelationInput
    pagos?: pagosOrderByWithRelationInput
    usuarios?: usuariosOrderByWithRelationInput
  }

  export type registrosWhereUniqueInput = Prisma.AtLeast<{
    id_registro?: bigint | number
    AND?: registrosWhereInput | registrosWhereInput[]
    OR?: registrosWhereInput[]
    NOT?: registrosWhereInput | registrosWhereInput[]
    id_usuario?: BigIntFilter<"registros"> | bigint | number
    id_evento?: BigIntFilter<"registros"> | bigint | number
    id_pago?: BigIntFilter<"registros"> | bigint | number
    cantidad?: IntFilter<"registros"> | number
    fecha_registro?: DateTimeNullableFilter<"registros"> | Date | string | null
    eventos?: XOR<EventosScalarRelationFilter, eventosWhereInput>
    pagos?: XOR<PagosScalarRelationFilter, pagosWhereInput>
    usuarios?: XOR<UsuariosScalarRelationFilter, usuariosWhereInput>
  }, "id_registro">

  export type registrosOrderByWithAggregationInput = {
    id_registro?: SortOrder
    id_usuario?: SortOrder
    id_evento?: SortOrder
    id_pago?: SortOrder
    cantidad?: SortOrder
    fecha_registro?: SortOrderInput | SortOrder
    _count?: registrosCountOrderByAggregateInput
    _avg?: registrosAvgOrderByAggregateInput
    _max?: registrosMaxOrderByAggregateInput
    _min?: registrosMinOrderByAggregateInput
    _sum?: registrosSumOrderByAggregateInput
  }

  export type registrosScalarWhereWithAggregatesInput = {
    AND?: registrosScalarWhereWithAggregatesInput | registrosScalarWhereWithAggregatesInput[]
    OR?: registrosScalarWhereWithAggregatesInput[]
    NOT?: registrosScalarWhereWithAggregatesInput | registrosScalarWhereWithAggregatesInput[]
    id_registro?: BigIntWithAggregatesFilter<"registros"> | bigint | number
    id_usuario?: BigIntWithAggregatesFilter<"registros"> | bigint | number
    id_evento?: BigIntWithAggregatesFilter<"registros"> | bigint | number
    id_pago?: BigIntWithAggregatesFilter<"registros"> | bigint | number
    cantidad?: IntWithAggregatesFilter<"registros"> | number
    fecha_registro?: DateTimeNullableWithAggregatesFilter<"registros"> | Date | string | null
  }

  export type usuariosWhereInput = {
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    id_usuario?: BigIntFilter<"usuarios"> | bigint | number
    nombre?: StringNullableFilter<"usuarios"> | string | null
    apellidos?: StringNullableFilter<"usuarios"> | string | null
    foto_perfil?: StringNullableFilter<"usuarios"> | string | null
    correo?: StringFilter<"usuarios"> | string
    contrasena?: StringNullableFilter<"usuarios"> | string | null
    google_id?: StringNullableFilter<"usuarios"> | string | null
    activo?: BoolNullableFilter<"usuarios"> | boolean | null
    rol?: StringNullableFilter<"usuarios"> | string | null
    creado_en?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    pagos?: PagosListRelationFilter
    registros?: RegistrosListRelationFilter
  }

  export type usuariosOrderByWithRelationInput = {
    id_usuario?: SortOrder
    nombre?: SortOrderInput | SortOrder
    apellidos?: SortOrderInput | SortOrder
    foto_perfil?: SortOrderInput | SortOrder
    correo?: SortOrder
    contrasena?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    activo?: SortOrderInput | SortOrder
    rol?: SortOrderInput | SortOrder
    creado_en?: SortOrderInput | SortOrder
    pagos?: pagosOrderByRelationAggregateInput
    registros?: registrosOrderByRelationAggregateInput
  }

  export type usuariosWhereUniqueInput = Prisma.AtLeast<{
    id_usuario?: bigint | number
    correo?: string
    google_id?: string
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    nombre?: StringNullableFilter<"usuarios"> | string | null
    apellidos?: StringNullableFilter<"usuarios"> | string | null
    foto_perfil?: StringNullableFilter<"usuarios"> | string | null
    contrasena?: StringNullableFilter<"usuarios"> | string | null
    activo?: BoolNullableFilter<"usuarios"> | boolean | null
    rol?: StringNullableFilter<"usuarios"> | string | null
    creado_en?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    pagos?: PagosListRelationFilter
    registros?: RegistrosListRelationFilter
  }, "id_usuario" | "correo" | "google_id">

  export type usuariosOrderByWithAggregationInput = {
    id_usuario?: SortOrder
    nombre?: SortOrderInput | SortOrder
    apellidos?: SortOrderInput | SortOrder
    foto_perfil?: SortOrderInput | SortOrder
    correo?: SortOrder
    contrasena?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    activo?: SortOrderInput | SortOrder
    rol?: SortOrderInput | SortOrder
    creado_en?: SortOrderInput | SortOrder
    _count?: usuariosCountOrderByAggregateInput
    _avg?: usuariosAvgOrderByAggregateInput
    _max?: usuariosMaxOrderByAggregateInput
    _min?: usuariosMinOrderByAggregateInput
    _sum?: usuariosSumOrderByAggregateInput
  }

  export type usuariosScalarWhereWithAggregatesInput = {
    AND?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    OR?: usuariosScalarWhereWithAggregatesInput[]
    NOT?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    id_usuario?: BigIntWithAggregatesFilter<"usuarios"> | bigint | number
    nombre?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    apellidos?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    foto_perfil?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    correo?: StringWithAggregatesFilter<"usuarios"> | string
    contrasena?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    google_id?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    activo?: BoolNullableWithAggregatesFilter<"usuarios"> | boolean | null
    rol?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    creado_en?: DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null
  }

  export type categoriasCreateInput = {
    id_categoria?: bigint | number
    nombre: string
    descripcion?: string | null
    creado_categoria?: Date | string | null
    eventos?: eventosCreateNestedManyWithoutCategoriasInput
  }

  export type categoriasUncheckedCreateInput = {
    id_categoria?: bigint | number
    nombre: string
    descripcion?: string | null
    creado_categoria?: Date | string | null
    eventos?: eventosUncheckedCreateNestedManyWithoutCategoriasInput
  }

  export type categoriasUpdateInput = {
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    creado_categoria?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventos?: eventosUpdateManyWithoutCategoriasNestedInput
  }

  export type categoriasUncheckedUpdateInput = {
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    creado_categoria?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventos?: eventosUncheckedUpdateManyWithoutCategoriasNestedInput
  }

  export type categoriasCreateManyInput = {
    id_categoria?: bigint | number
    nombre: string
    descripcion?: string | null
    creado_categoria?: Date | string | null
  }

  export type categoriasUpdateManyMutationInput = {
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    creado_categoria?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type categoriasUncheckedUpdateManyInput = {
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    creado_categoria?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type eventosCreateInput = {
    id_evento?: bigint | number
    titulo: string
    descripcion?: string | null
    ubicacion?: string | null
    fecha_inicio: Date | string
    fecha_fin: Date | string
    precio?: Decimal | DecimalJsLike | number | string | null
    imagen?: string | null
    creado_evento?: Date | string | null
    actualizado_evento?: Date | string | null
    categorias: categoriasCreateNestedOneWithoutEventosInput
    registros?: registrosCreateNestedManyWithoutEventosInput
  }

  export type eventosUncheckedCreateInput = {
    id_evento?: bigint | number
    titulo: string
    descripcion?: string | null
    ubicacion?: string | null
    fecha_inicio: Date | string
    fecha_fin: Date | string
    precio?: Decimal | DecimalJsLike | number | string | null
    imagen?: string | null
    id_categoria: bigint | number
    creado_evento?: Date | string | null
    actualizado_evento?: Date | string | null
    registros?: registrosUncheckedCreateNestedManyWithoutEventosInput
  }

  export type eventosUpdateInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categorias?: categoriasUpdateOneRequiredWithoutEventosNestedInput
    registros?: registrosUpdateManyWithoutEventosNestedInput
  }

  export type eventosUncheckedUpdateInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registros?: registrosUncheckedUpdateManyWithoutEventosNestedInput
  }

  export type eventosCreateManyInput = {
    id_evento?: bigint | number
    titulo: string
    descripcion?: string | null
    ubicacion?: string | null
    fecha_inicio: Date | string
    fecha_fin: Date | string
    precio?: Decimal | DecimalJsLike | number | string | null
    imagen?: string | null
    id_categoria: bigint | number
    creado_evento?: Date | string | null
    actualizado_evento?: Date | string | null
  }

  export type eventosUpdateManyMutationInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type eventosUncheckedUpdateManyInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pagosCreateInput = {
    id_pago?: bigint | number
    monto: Decimal | DecimalJsLike | number | string
    metodo_pago?: string
    estado_pago?: string | null
    fecha_pago?: Date | string | null
    usuarios?: usuariosCreateNestedOneWithoutPagosInput
    registros?: registrosCreateNestedManyWithoutPagosInput
  }

  export type pagosUncheckedCreateInput = {
    id_pago?: bigint | number
    id_usuario?: bigint | number | null
    monto: Decimal | DecimalJsLike | number | string
    metodo_pago?: string
    estado_pago?: string | null
    fecha_pago?: Date | string | null
    registros?: registrosUncheckedCreateNestedManyWithoutPagosInput
  }

  export type pagosUpdateInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuarios?: usuariosUpdateOneWithoutPagosNestedInput
    registros?: registrosUpdateManyWithoutPagosNestedInput
  }

  export type pagosUncheckedUpdateInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registros?: registrosUncheckedUpdateManyWithoutPagosNestedInput
  }

  export type pagosCreateManyInput = {
    id_pago?: bigint | number
    id_usuario?: bigint | number | null
    monto: Decimal | DecimalJsLike | number | string
    metodo_pago?: string
    estado_pago?: string | null
    fecha_pago?: Date | string | null
  }

  export type pagosUpdateManyMutationInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pagosUncheckedUpdateManyInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosCreateInput = {
    id_registro?: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
    eventos: eventosCreateNestedOneWithoutRegistrosInput
    pagos: pagosCreateNestedOneWithoutRegistrosInput
    usuarios: usuariosCreateNestedOneWithoutRegistrosInput
  }

  export type registrosUncheckedCreateInput = {
    id_registro?: bigint | number
    id_usuario: bigint | number
    id_evento: bigint | number
    id_pago: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
  }

  export type registrosUpdateInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventos?: eventosUpdateOneRequiredWithoutRegistrosNestedInput
    pagos?: pagosUpdateOneRequiredWithoutRegistrosNestedInput
    usuarios?: usuariosUpdateOneRequiredWithoutRegistrosNestedInput
  }

  export type registrosUncheckedUpdateInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosCreateManyInput = {
    id_registro?: bigint | number
    id_usuario: bigint | number
    id_evento: bigint | number
    id_pago: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
  }

  export type registrosUpdateManyMutationInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosUncheckedUpdateManyInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usuariosCreateInput = {
    id_usuario?: bigint | number
    nombre?: string | null
    apellidos?: string | null
    foto_perfil?: string | null
    correo: string
    contrasena?: string | null
    google_id?: string | null
    activo?: boolean | null
    rol?: string | null
    creado_en?: Date | string | null
    pagos?: pagosCreateNestedManyWithoutUsuariosInput
    registros?: registrosCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateInput = {
    id_usuario?: bigint | number
    nombre?: string | null
    apellidos?: string | null
    foto_perfil?: string | null
    correo: string
    contrasena?: string | null
    google_id?: string | null
    activo?: boolean | null
    rol?: string | null
    creado_en?: Date | string | null
    pagos?: pagosUncheckedCreateNestedManyWithoutUsuariosInput
    registros?: registrosUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUpdateInput = {
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellidos?: NullableStringFieldUpdateOperationsInput | string | null
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUpdateManyWithoutUsuariosNestedInput
    registros?: registrosUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateInput = {
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellidos?: NullableStringFieldUpdateOperationsInput | string | null
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUncheckedUpdateManyWithoutUsuariosNestedInput
    registros?: registrosUncheckedUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosCreateManyInput = {
    id_usuario?: bigint | number
    nombre?: string | null
    apellidos?: string | null
    foto_perfil?: string | null
    correo: string
    contrasena?: string | null
    google_id?: string | null
    activo?: boolean | null
    rol?: string | null
    creado_en?: Date | string | null
  }

  export type usuariosUpdateManyMutationInput = {
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellidos?: NullableStringFieldUpdateOperationsInput | string | null
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usuariosUncheckedUpdateManyInput = {
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellidos?: NullableStringFieldUpdateOperationsInput | string | null
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type EventosListRelationFilter = {
    every?: eventosWhereInput
    some?: eventosWhereInput
    none?: eventosWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type eventosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type categoriasCountOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    creado_categoria?: SortOrder
  }

  export type categoriasAvgOrderByAggregateInput = {
    id_categoria?: SortOrder
  }

  export type categoriasMaxOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    creado_categoria?: SortOrder
  }

  export type categoriasMinOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    creado_categoria?: SortOrder
  }

  export type categoriasSumOrderByAggregateInput = {
    id_categoria?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type CategoriasScalarRelationFilter = {
    is?: categoriasWhereInput
    isNot?: categoriasWhereInput
  }

  export type RegistrosListRelationFilter = {
    every?: registrosWhereInput
    some?: registrosWhereInput
    none?: registrosWhereInput
  }

  export type registrosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type eventosCountOrderByAggregateInput = {
    id_evento?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    ubicacion?: SortOrder
    fecha_inicio?: SortOrder
    fecha_fin?: SortOrder
    precio?: SortOrder
    imagen?: SortOrder
    id_categoria?: SortOrder
    creado_evento?: SortOrder
    actualizado_evento?: SortOrder
  }

  export type eventosAvgOrderByAggregateInput = {
    id_evento?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
  }

  export type eventosMaxOrderByAggregateInput = {
    id_evento?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    ubicacion?: SortOrder
    fecha_inicio?: SortOrder
    fecha_fin?: SortOrder
    precio?: SortOrder
    imagen?: SortOrder
    id_categoria?: SortOrder
    creado_evento?: SortOrder
    actualizado_evento?: SortOrder
  }

  export type eventosMinOrderByAggregateInput = {
    id_evento?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    ubicacion?: SortOrder
    fecha_inicio?: SortOrder
    fecha_fin?: SortOrder
    precio?: SortOrder
    imagen?: SortOrder
    id_categoria?: SortOrder
    creado_evento?: SortOrder
    actualizado_evento?: SortOrder
  }

  export type eventosSumOrderByAggregateInput = {
    id_evento?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
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

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type UsuariosNullableScalarRelationFilter = {
    is?: usuariosWhereInput | null
    isNot?: usuariosWhereInput | null
  }

  export type pagosCountOrderByAggregateInput = {
    id_pago?: SortOrder
    id_usuario?: SortOrder
    monto?: SortOrder
    metodo_pago?: SortOrder
    estado_pago?: SortOrder
    fecha_pago?: SortOrder
  }

  export type pagosAvgOrderByAggregateInput = {
    id_pago?: SortOrder
    id_usuario?: SortOrder
    monto?: SortOrder
  }

  export type pagosMaxOrderByAggregateInput = {
    id_pago?: SortOrder
    id_usuario?: SortOrder
    monto?: SortOrder
    metodo_pago?: SortOrder
    estado_pago?: SortOrder
    fecha_pago?: SortOrder
  }

  export type pagosMinOrderByAggregateInput = {
    id_pago?: SortOrder
    id_usuario?: SortOrder
    monto?: SortOrder
    metodo_pago?: SortOrder
    estado_pago?: SortOrder
    fecha_pago?: SortOrder
  }

  export type pagosSumOrderByAggregateInput = {
    id_pago?: SortOrder
    id_usuario?: SortOrder
    monto?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type EventosScalarRelationFilter = {
    is?: eventosWhereInput
    isNot?: eventosWhereInput
  }

  export type PagosScalarRelationFilter = {
    is?: pagosWhereInput
    isNot?: pagosWhereInput
  }

  export type UsuariosScalarRelationFilter = {
    is?: usuariosWhereInput
    isNot?: usuariosWhereInput
  }

  export type registrosCountOrderByAggregateInput = {
    id_registro?: SortOrder
    id_usuario?: SortOrder
    id_evento?: SortOrder
    id_pago?: SortOrder
    cantidad?: SortOrder
    fecha_registro?: SortOrder
  }

  export type registrosAvgOrderByAggregateInput = {
    id_registro?: SortOrder
    id_usuario?: SortOrder
    id_evento?: SortOrder
    id_pago?: SortOrder
    cantidad?: SortOrder
  }

  export type registrosMaxOrderByAggregateInput = {
    id_registro?: SortOrder
    id_usuario?: SortOrder
    id_evento?: SortOrder
    id_pago?: SortOrder
    cantidad?: SortOrder
    fecha_registro?: SortOrder
  }

  export type registrosMinOrderByAggregateInput = {
    id_registro?: SortOrder
    id_usuario?: SortOrder
    id_evento?: SortOrder
    id_pago?: SortOrder
    cantidad?: SortOrder
    fecha_registro?: SortOrder
  }

  export type registrosSumOrderByAggregateInput = {
    id_registro?: SortOrder
    id_usuario?: SortOrder
    id_evento?: SortOrder
    id_pago?: SortOrder
    cantidad?: SortOrder
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type PagosListRelationFilter = {
    every?: pagosWhereInput
    some?: pagosWhereInput
    none?: pagosWhereInput
  }

  export type pagosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usuariosCountOrderByAggregateInput = {
    id_usuario?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    foto_perfil?: SortOrder
    correo?: SortOrder
    contrasena?: SortOrder
    google_id?: SortOrder
    activo?: SortOrder
    rol?: SortOrder
    creado_en?: SortOrder
  }

  export type usuariosAvgOrderByAggregateInput = {
    id_usuario?: SortOrder
  }

  export type usuariosMaxOrderByAggregateInput = {
    id_usuario?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    foto_perfil?: SortOrder
    correo?: SortOrder
    contrasena?: SortOrder
    google_id?: SortOrder
    activo?: SortOrder
    rol?: SortOrder
    creado_en?: SortOrder
  }

  export type usuariosMinOrderByAggregateInput = {
    id_usuario?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    foto_perfil?: SortOrder
    correo?: SortOrder
    contrasena?: SortOrder
    google_id?: SortOrder
    activo?: SortOrder
    rol?: SortOrder
    creado_en?: SortOrder
  }

  export type usuariosSumOrderByAggregateInput = {
    id_usuario?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type eventosCreateNestedManyWithoutCategoriasInput = {
    create?: XOR<eventosCreateWithoutCategoriasInput, eventosUncheckedCreateWithoutCategoriasInput> | eventosCreateWithoutCategoriasInput[] | eventosUncheckedCreateWithoutCategoriasInput[]
    connectOrCreate?: eventosCreateOrConnectWithoutCategoriasInput | eventosCreateOrConnectWithoutCategoriasInput[]
    createMany?: eventosCreateManyCategoriasInputEnvelope
    connect?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
  }

  export type eventosUncheckedCreateNestedManyWithoutCategoriasInput = {
    create?: XOR<eventosCreateWithoutCategoriasInput, eventosUncheckedCreateWithoutCategoriasInput> | eventosCreateWithoutCategoriasInput[] | eventosUncheckedCreateWithoutCategoriasInput[]
    connectOrCreate?: eventosCreateOrConnectWithoutCategoriasInput | eventosCreateOrConnectWithoutCategoriasInput[]
    createMany?: eventosCreateManyCategoriasInputEnvelope
    connect?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type eventosUpdateManyWithoutCategoriasNestedInput = {
    create?: XOR<eventosCreateWithoutCategoriasInput, eventosUncheckedCreateWithoutCategoriasInput> | eventosCreateWithoutCategoriasInput[] | eventosUncheckedCreateWithoutCategoriasInput[]
    connectOrCreate?: eventosCreateOrConnectWithoutCategoriasInput | eventosCreateOrConnectWithoutCategoriasInput[]
    upsert?: eventosUpsertWithWhereUniqueWithoutCategoriasInput | eventosUpsertWithWhereUniqueWithoutCategoriasInput[]
    createMany?: eventosCreateManyCategoriasInputEnvelope
    set?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
    disconnect?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
    delete?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
    connect?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
    update?: eventosUpdateWithWhereUniqueWithoutCategoriasInput | eventosUpdateWithWhereUniqueWithoutCategoriasInput[]
    updateMany?: eventosUpdateManyWithWhereWithoutCategoriasInput | eventosUpdateManyWithWhereWithoutCategoriasInput[]
    deleteMany?: eventosScalarWhereInput | eventosScalarWhereInput[]
  }

  export type eventosUncheckedUpdateManyWithoutCategoriasNestedInput = {
    create?: XOR<eventosCreateWithoutCategoriasInput, eventosUncheckedCreateWithoutCategoriasInput> | eventosCreateWithoutCategoriasInput[] | eventosUncheckedCreateWithoutCategoriasInput[]
    connectOrCreate?: eventosCreateOrConnectWithoutCategoriasInput | eventosCreateOrConnectWithoutCategoriasInput[]
    upsert?: eventosUpsertWithWhereUniqueWithoutCategoriasInput | eventosUpsertWithWhereUniqueWithoutCategoriasInput[]
    createMany?: eventosCreateManyCategoriasInputEnvelope
    set?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
    disconnect?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
    delete?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
    connect?: eventosWhereUniqueInput | eventosWhereUniqueInput[]
    update?: eventosUpdateWithWhereUniqueWithoutCategoriasInput | eventosUpdateWithWhereUniqueWithoutCategoriasInput[]
    updateMany?: eventosUpdateManyWithWhereWithoutCategoriasInput | eventosUpdateManyWithWhereWithoutCategoriasInput[]
    deleteMany?: eventosScalarWhereInput | eventosScalarWhereInput[]
  }

  export type categoriasCreateNestedOneWithoutEventosInput = {
    create?: XOR<categoriasCreateWithoutEventosInput, categoriasUncheckedCreateWithoutEventosInput>
    connectOrCreate?: categoriasCreateOrConnectWithoutEventosInput
    connect?: categoriasWhereUniqueInput
  }

  export type registrosCreateNestedManyWithoutEventosInput = {
    create?: XOR<registrosCreateWithoutEventosInput, registrosUncheckedCreateWithoutEventosInput> | registrosCreateWithoutEventosInput[] | registrosUncheckedCreateWithoutEventosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutEventosInput | registrosCreateOrConnectWithoutEventosInput[]
    createMany?: registrosCreateManyEventosInputEnvelope
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
  }

  export type registrosUncheckedCreateNestedManyWithoutEventosInput = {
    create?: XOR<registrosCreateWithoutEventosInput, registrosUncheckedCreateWithoutEventosInput> | registrosCreateWithoutEventosInput[] | registrosUncheckedCreateWithoutEventosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutEventosInput | registrosCreateOrConnectWithoutEventosInput[]
    createMany?: registrosCreateManyEventosInputEnvelope
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type categoriasUpdateOneRequiredWithoutEventosNestedInput = {
    create?: XOR<categoriasCreateWithoutEventosInput, categoriasUncheckedCreateWithoutEventosInput>
    connectOrCreate?: categoriasCreateOrConnectWithoutEventosInput
    upsert?: categoriasUpsertWithoutEventosInput
    connect?: categoriasWhereUniqueInput
    update?: XOR<XOR<categoriasUpdateToOneWithWhereWithoutEventosInput, categoriasUpdateWithoutEventosInput>, categoriasUncheckedUpdateWithoutEventosInput>
  }

  export type registrosUpdateManyWithoutEventosNestedInput = {
    create?: XOR<registrosCreateWithoutEventosInput, registrosUncheckedCreateWithoutEventosInput> | registrosCreateWithoutEventosInput[] | registrosUncheckedCreateWithoutEventosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutEventosInput | registrosCreateOrConnectWithoutEventosInput[]
    upsert?: registrosUpsertWithWhereUniqueWithoutEventosInput | registrosUpsertWithWhereUniqueWithoutEventosInput[]
    createMany?: registrosCreateManyEventosInputEnvelope
    set?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    disconnect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    delete?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    update?: registrosUpdateWithWhereUniqueWithoutEventosInput | registrosUpdateWithWhereUniqueWithoutEventosInput[]
    updateMany?: registrosUpdateManyWithWhereWithoutEventosInput | registrosUpdateManyWithWhereWithoutEventosInput[]
    deleteMany?: registrosScalarWhereInput | registrosScalarWhereInput[]
  }

  export type registrosUncheckedUpdateManyWithoutEventosNestedInput = {
    create?: XOR<registrosCreateWithoutEventosInput, registrosUncheckedCreateWithoutEventosInput> | registrosCreateWithoutEventosInput[] | registrosUncheckedCreateWithoutEventosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutEventosInput | registrosCreateOrConnectWithoutEventosInput[]
    upsert?: registrosUpsertWithWhereUniqueWithoutEventosInput | registrosUpsertWithWhereUniqueWithoutEventosInput[]
    createMany?: registrosCreateManyEventosInputEnvelope
    set?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    disconnect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    delete?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    update?: registrosUpdateWithWhereUniqueWithoutEventosInput | registrosUpdateWithWhereUniqueWithoutEventosInput[]
    updateMany?: registrosUpdateManyWithWhereWithoutEventosInput | registrosUpdateManyWithWhereWithoutEventosInput[]
    deleteMany?: registrosScalarWhereInput | registrosScalarWhereInput[]
  }

  export type usuariosCreateNestedOneWithoutPagosInput = {
    create?: XOR<usuariosCreateWithoutPagosInput, usuariosUncheckedCreateWithoutPagosInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutPagosInput
    connect?: usuariosWhereUniqueInput
  }

  export type registrosCreateNestedManyWithoutPagosInput = {
    create?: XOR<registrosCreateWithoutPagosInput, registrosUncheckedCreateWithoutPagosInput> | registrosCreateWithoutPagosInput[] | registrosUncheckedCreateWithoutPagosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutPagosInput | registrosCreateOrConnectWithoutPagosInput[]
    createMany?: registrosCreateManyPagosInputEnvelope
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
  }

  export type registrosUncheckedCreateNestedManyWithoutPagosInput = {
    create?: XOR<registrosCreateWithoutPagosInput, registrosUncheckedCreateWithoutPagosInput> | registrosCreateWithoutPagosInput[] | registrosUncheckedCreateWithoutPagosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutPagosInput | registrosCreateOrConnectWithoutPagosInput[]
    createMany?: registrosCreateManyPagosInputEnvelope
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type usuariosUpdateOneWithoutPagosNestedInput = {
    create?: XOR<usuariosCreateWithoutPagosInput, usuariosUncheckedCreateWithoutPagosInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutPagosInput
    upsert?: usuariosUpsertWithoutPagosInput
    disconnect?: usuariosWhereInput | boolean
    delete?: usuariosWhereInput | boolean
    connect?: usuariosWhereUniqueInput
    update?: XOR<XOR<usuariosUpdateToOneWithWhereWithoutPagosInput, usuariosUpdateWithoutPagosInput>, usuariosUncheckedUpdateWithoutPagosInput>
  }

  export type registrosUpdateManyWithoutPagosNestedInput = {
    create?: XOR<registrosCreateWithoutPagosInput, registrosUncheckedCreateWithoutPagosInput> | registrosCreateWithoutPagosInput[] | registrosUncheckedCreateWithoutPagosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutPagosInput | registrosCreateOrConnectWithoutPagosInput[]
    upsert?: registrosUpsertWithWhereUniqueWithoutPagosInput | registrosUpsertWithWhereUniqueWithoutPagosInput[]
    createMany?: registrosCreateManyPagosInputEnvelope
    set?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    disconnect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    delete?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    update?: registrosUpdateWithWhereUniqueWithoutPagosInput | registrosUpdateWithWhereUniqueWithoutPagosInput[]
    updateMany?: registrosUpdateManyWithWhereWithoutPagosInput | registrosUpdateManyWithWhereWithoutPagosInput[]
    deleteMany?: registrosScalarWhereInput | registrosScalarWhereInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type registrosUncheckedUpdateManyWithoutPagosNestedInput = {
    create?: XOR<registrosCreateWithoutPagosInput, registrosUncheckedCreateWithoutPagosInput> | registrosCreateWithoutPagosInput[] | registrosUncheckedCreateWithoutPagosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutPagosInput | registrosCreateOrConnectWithoutPagosInput[]
    upsert?: registrosUpsertWithWhereUniqueWithoutPagosInput | registrosUpsertWithWhereUniqueWithoutPagosInput[]
    createMany?: registrosCreateManyPagosInputEnvelope
    set?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    disconnect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    delete?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    update?: registrosUpdateWithWhereUniqueWithoutPagosInput | registrosUpdateWithWhereUniqueWithoutPagosInput[]
    updateMany?: registrosUpdateManyWithWhereWithoutPagosInput | registrosUpdateManyWithWhereWithoutPagosInput[]
    deleteMany?: registrosScalarWhereInput | registrosScalarWhereInput[]
  }

  export type eventosCreateNestedOneWithoutRegistrosInput = {
    create?: XOR<eventosCreateWithoutRegistrosInput, eventosUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: eventosCreateOrConnectWithoutRegistrosInput
    connect?: eventosWhereUniqueInput
  }

  export type pagosCreateNestedOneWithoutRegistrosInput = {
    create?: XOR<pagosCreateWithoutRegistrosInput, pagosUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: pagosCreateOrConnectWithoutRegistrosInput
    connect?: pagosWhereUniqueInput
  }

  export type usuariosCreateNestedOneWithoutRegistrosInput = {
    create?: XOR<usuariosCreateWithoutRegistrosInput, usuariosUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutRegistrosInput
    connect?: usuariosWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type eventosUpdateOneRequiredWithoutRegistrosNestedInput = {
    create?: XOR<eventosCreateWithoutRegistrosInput, eventosUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: eventosCreateOrConnectWithoutRegistrosInput
    upsert?: eventosUpsertWithoutRegistrosInput
    connect?: eventosWhereUniqueInput
    update?: XOR<XOR<eventosUpdateToOneWithWhereWithoutRegistrosInput, eventosUpdateWithoutRegistrosInput>, eventosUncheckedUpdateWithoutRegistrosInput>
  }

  export type pagosUpdateOneRequiredWithoutRegistrosNestedInput = {
    create?: XOR<pagosCreateWithoutRegistrosInput, pagosUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: pagosCreateOrConnectWithoutRegistrosInput
    upsert?: pagosUpsertWithoutRegistrosInput
    connect?: pagosWhereUniqueInput
    update?: XOR<XOR<pagosUpdateToOneWithWhereWithoutRegistrosInput, pagosUpdateWithoutRegistrosInput>, pagosUncheckedUpdateWithoutRegistrosInput>
  }

  export type usuariosUpdateOneRequiredWithoutRegistrosNestedInput = {
    create?: XOR<usuariosCreateWithoutRegistrosInput, usuariosUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutRegistrosInput
    upsert?: usuariosUpsertWithoutRegistrosInput
    connect?: usuariosWhereUniqueInput
    update?: XOR<XOR<usuariosUpdateToOneWithWhereWithoutRegistrosInput, usuariosUpdateWithoutRegistrosInput>, usuariosUncheckedUpdateWithoutRegistrosInput>
  }

  export type pagosCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<pagosCreateWithoutUsuariosInput, pagosUncheckedCreateWithoutUsuariosInput> | pagosCreateWithoutUsuariosInput[] | pagosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: pagosCreateOrConnectWithoutUsuariosInput | pagosCreateOrConnectWithoutUsuariosInput[]
    createMany?: pagosCreateManyUsuariosInputEnvelope
    connect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
  }

  export type registrosCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<registrosCreateWithoutUsuariosInput, registrosUncheckedCreateWithoutUsuariosInput> | registrosCreateWithoutUsuariosInput[] | registrosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutUsuariosInput | registrosCreateOrConnectWithoutUsuariosInput[]
    createMany?: registrosCreateManyUsuariosInputEnvelope
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
  }

  export type pagosUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<pagosCreateWithoutUsuariosInput, pagosUncheckedCreateWithoutUsuariosInput> | pagosCreateWithoutUsuariosInput[] | pagosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: pagosCreateOrConnectWithoutUsuariosInput | pagosCreateOrConnectWithoutUsuariosInput[]
    createMany?: pagosCreateManyUsuariosInputEnvelope
    connect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
  }

  export type registrosUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<registrosCreateWithoutUsuariosInput, registrosUncheckedCreateWithoutUsuariosInput> | registrosCreateWithoutUsuariosInput[] | registrosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutUsuariosInput | registrosCreateOrConnectWithoutUsuariosInput[]
    createMany?: registrosCreateManyUsuariosInputEnvelope
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type pagosUpdateManyWithoutUsuariosNestedInput = {
    create?: XOR<pagosCreateWithoutUsuariosInput, pagosUncheckedCreateWithoutUsuariosInput> | pagosCreateWithoutUsuariosInput[] | pagosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: pagosCreateOrConnectWithoutUsuariosInput | pagosCreateOrConnectWithoutUsuariosInput[]
    upsert?: pagosUpsertWithWhereUniqueWithoutUsuariosInput | pagosUpsertWithWhereUniqueWithoutUsuariosInput[]
    createMany?: pagosCreateManyUsuariosInputEnvelope
    set?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    disconnect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    delete?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    connect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    update?: pagosUpdateWithWhereUniqueWithoutUsuariosInput | pagosUpdateWithWhereUniqueWithoutUsuariosInput[]
    updateMany?: pagosUpdateManyWithWhereWithoutUsuariosInput | pagosUpdateManyWithWhereWithoutUsuariosInput[]
    deleteMany?: pagosScalarWhereInput | pagosScalarWhereInput[]
  }

  export type registrosUpdateManyWithoutUsuariosNestedInput = {
    create?: XOR<registrosCreateWithoutUsuariosInput, registrosUncheckedCreateWithoutUsuariosInput> | registrosCreateWithoutUsuariosInput[] | registrosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutUsuariosInput | registrosCreateOrConnectWithoutUsuariosInput[]
    upsert?: registrosUpsertWithWhereUniqueWithoutUsuariosInput | registrosUpsertWithWhereUniqueWithoutUsuariosInput[]
    createMany?: registrosCreateManyUsuariosInputEnvelope
    set?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    disconnect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    delete?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    update?: registrosUpdateWithWhereUniqueWithoutUsuariosInput | registrosUpdateWithWhereUniqueWithoutUsuariosInput[]
    updateMany?: registrosUpdateManyWithWhereWithoutUsuariosInput | registrosUpdateManyWithWhereWithoutUsuariosInput[]
    deleteMany?: registrosScalarWhereInput | registrosScalarWhereInput[]
  }

  export type pagosUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: XOR<pagosCreateWithoutUsuariosInput, pagosUncheckedCreateWithoutUsuariosInput> | pagosCreateWithoutUsuariosInput[] | pagosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: pagosCreateOrConnectWithoutUsuariosInput | pagosCreateOrConnectWithoutUsuariosInput[]
    upsert?: pagosUpsertWithWhereUniqueWithoutUsuariosInput | pagosUpsertWithWhereUniqueWithoutUsuariosInput[]
    createMany?: pagosCreateManyUsuariosInputEnvelope
    set?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    disconnect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    delete?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    connect?: pagosWhereUniqueInput | pagosWhereUniqueInput[]
    update?: pagosUpdateWithWhereUniqueWithoutUsuariosInput | pagosUpdateWithWhereUniqueWithoutUsuariosInput[]
    updateMany?: pagosUpdateManyWithWhereWithoutUsuariosInput | pagosUpdateManyWithWhereWithoutUsuariosInput[]
    deleteMany?: pagosScalarWhereInput | pagosScalarWhereInput[]
  }

  export type registrosUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: XOR<registrosCreateWithoutUsuariosInput, registrosUncheckedCreateWithoutUsuariosInput> | registrosCreateWithoutUsuariosInput[] | registrosUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: registrosCreateOrConnectWithoutUsuariosInput | registrosCreateOrConnectWithoutUsuariosInput[]
    upsert?: registrosUpsertWithWhereUniqueWithoutUsuariosInput | registrosUpsertWithWhereUniqueWithoutUsuariosInput[]
    createMany?: registrosCreateManyUsuariosInputEnvelope
    set?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    disconnect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    delete?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    connect?: registrosWhereUniqueInput | registrosWhereUniqueInput[]
    update?: registrosUpdateWithWhereUniqueWithoutUsuariosInput | registrosUpdateWithWhereUniqueWithoutUsuariosInput[]
    updateMany?: registrosUpdateManyWithWhereWithoutUsuariosInput | registrosUpdateManyWithWhereWithoutUsuariosInput[]
    deleteMany?: registrosScalarWhereInput | registrosScalarWhereInput[]
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
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

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type eventosCreateWithoutCategoriasInput = {
    id_evento?: bigint | number
    titulo: string
    descripcion?: string | null
    ubicacion?: string | null
    fecha_inicio: Date | string
    fecha_fin: Date | string
    precio?: Decimal | DecimalJsLike | number | string | null
    imagen?: string | null
    creado_evento?: Date | string | null
    actualizado_evento?: Date | string | null
    registros?: registrosCreateNestedManyWithoutEventosInput
  }

  export type eventosUncheckedCreateWithoutCategoriasInput = {
    id_evento?: bigint | number
    titulo: string
    descripcion?: string | null
    ubicacion?: string | null
    fecha_inicio: Date | string
    fecha_fin: Date | string
    precio?: Decimal | DecimalJsLike | number | string | null
    imagen?: string | null
    creado_evento?: Date | string | null
    actualizado_evento?: Date | string | null
    registros?: registrosUncheckedCreateNestedManyWithoutEventosInput
  }

  export type eventosCreateOrConnectWithoutCategoriasInput = {
    where: eventosWhereUniqueInput
    create: XOR<eventosCreateWithoutCategoriasInput, eventosUncheckedCreateWithoutCategoriasInput>
  }

  export type eventosCreateManyCategoriasInputEnvelope = {
    data: eventosCreateManyCategoriasInput | eventosCreateManyCategoriasInput[]
    skipDuplicates?: boolean
  }

  export type eventosUpsertWithWhereUniqueWithoutCategoriasInput = {
    where: eventosWhereUniqueInput
    update: XOR<eventosUpdateWithoutCategoriasInput, eventosUncheckedUpdateWithoutCategoriasInput>
    create: XOR<eventosCreateWithoutCategoriasInput, eventosUncheckedCreateWithoutCategoriasInput>
  }

  export type eventosUpdateWithWhereUniqueWithoutCategoriasInput = {
    where: eventosWhereUniqueInput
    data: XOR<eventosUpdateWithoutCategoriasInput, eventosUncheckedUpdateWithoutCategoriasInput>
  }

  export type eventosUpdateManyWithWhereWithoutCategoriasInput = {
    where: eventosScalarWhereInput
    data: XOR<eventosUpdateManyMutationInput, eventosUncheckedUpdateManyWithoutCategoriasInput>
  }

  export type eventosScalarWhereInput = {
    AND?: eventosScalarWhereInput | eventosScalarWhereInput[]
    OR?: eventosScalarWhereInput[]
    NOT?: eventosScalarWhereInput | eventosScalarWhereInput[]
    id_evento?: BigIntFilter<"eventos"> | bigint | number
    titulo?: StringFilter<"eventos"> | string
    descripcion?: StringNullableFilter<"eventos"> | string | null
    ubicacion?: StringNullableFilter<"eventos"> | string | null
    fecha_inicio?: DateTimeFilter<"eventos"> | Date | string
    fecha_fin?: DateTimeFilter<"eventos"> | Date | string
    precio?: DecimalNullableFilter<"eventos"> | Decimal | DecimalJsLike | number | string | null
    imagen?: StringNullableFilter<"eventos"> | string | null
    id_categoria?: BigIntFilter<"eventos"> | bigint | number
    creado_evento?: DateTimeNullableFilter<"eventos"> | Date | string | null
    actualizado_evento?: DateTimeNullableFilter<"eventos"> | Date | string | null
  }

  export type categoriasCreateWithoutEventosInput = {
    id_categoria?: bigint | number
    nombre: string
    descripcion?: string | null
    creado_categoria?: Date | string | null
  }

  export type categoriasUncheckedCreateWithoutEventosInput = {
    id_categoria?: bigint | number
    nombre: string
    descripcion?: string | null
    creado_categoria?: Date | string | null
  }

  export type categoriasCreateOrConnectWithoutEventosInput = {
    where: categoriasWhereUniqueInput
    create: XOR<categoriasCreateWithoutEventosInput, categoriasUncheckedCreateWithoutEventosInput>
  }

  export type registrosCreateWithoutEventosInput = {
    id_registro?: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
    pagos: pagosCreateNestedOneWithoutRegistrosInput
    usuarios: usuariosCreateNestedOneWithoutRegistrosInput
  }

  export type registrosUncheckedCreateWithoutEventosInput = {
    id_registro?: bigint | number
    id_usuario: bigint | number
    id_pago: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
  }

  export type registrosCreateOrConnectWithoutEventosInput = {
    where: registrosWhereUniqueInput
    create: XOR<registrosCreateWithoutEventosInput, registrosUncheckedCreateWithoutEventosInput>
  }

  export type registrosCreateManyEventosInputEnvelope = {
    data: registrosCreateManyEventosInput | registrosCreateManyEventosInput[]
    skipDuplicates?: boolean
  }

  export type categoriasUpsertWithoutEventosInput = {
    update: XOR<categoriasUpdateWithoutEventosInput, categoriasUncheckedUpdateWithoutEventosInput>
    create: XOR<categoriasCreateWithoutEventosInput, categoriasUncheckedCreateWithoutEventosInput>
    where?: categoriasWhereInput
  }

  export type categoriasUpdateToOneWithWhereWithoutEventosInput = {
    where?: categoriasWhereInput
    data: XOR<categoriasUpdateWithoutEventosInput, categoriasUncheckedUpdateWithoutEventosInput>
  }

  export type categoriasUpdateWithoutEventosInput = {
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    creado_categoria?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type categoriasUncheckedUpdateWithoutEventosInput = {
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    creado_categoria?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosUpsertWithWhereUniqueWithoutEventosInput = {
    where: registrosWhereUniqueInput
    update: XOR<registrosUpdateWithoutEventosInput, registrosUncheckedUpdateWithoutEventosInput>
    create: XOR<registrosCreateWithoutEventosInput, registrosUncheckedCreateWithoutEventosInput>
  }

  export type registrosUpdateWithWhereUniqueWithoutEventosInput = {
    where: registrosWhereUniqueInput
    data: XOR<registrosUpdateWithoutEventosInput, registrosUncheckedUpdateWithoutEventosInput>
  }

  export type registrosUpdateManyWithWhereWithoutEventosInput = {
    where: registrosScalarWhereInput
    data: XOR<registrosUpdateManyMutationInput, registrosUncheckedUpdateManyWithoutEventosInput>
  }

  export type registrosScalarWhereInput = {
    AND?: registrosScalarWhereInput | registrosScalarWhereInput[]
    OR?: registrosScalarWhereInput[]
    NOT?: registrosScalarWhereInput | registrosScalarWhereInput[]
    id_registro?: BigIntFilter<"registros"> | bigint | number
    id_usuario?: BigIntFilter<"registros"> | bigint | number
    id_evento?: BigIntFilter<"registros"> | bigint | number
    id_pago?: BigIntFilter<"registros"> | bigint | number
    cantidad?: IntFilter<"registros"> | number
    fecha_registro?: DateTimeNullableFilter<"registros"> | Date | string | null
  }

  export type usuariosCreateWithoutPagosInput = {
    id_usuario?: bigint | number
    nombre?: string | null
    apellidos?: string | null
    foto_perfil?: string | null
    correo: string
    contrasena?: string | null
    google_id?: string | null
    activo?: boolean | null
    rol?: string | null
    creado_en?: Date | string | null
    registros?: registrosCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateWithoutPagosInput = {
    id_usuario?: bigint | number
    nombre?: string | null
    apellidos?: string | null
    foto_perfil?: string | null
    correo: string
    contrasena?: string | null
    google_id?: string | null
    activo?: boolean | null
    rol?: string | null
    creado_en?: Date | string | null
    registros?: registrosUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosCreateOrConnectWithoutPagosInput = {
    where: usuariosWhereUniqueInput
    create: XOR<usuariosCreateWithoutPagosInput, usuariosUncheckedCreateWithoutPagosInput>
  }

  export type registrosCreateWithoutPagosInput = {
    id_registro?: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
    eventos: eventosCreateNestedOneWithoutRegistrosInput
    usuarios: usuariosCreateNestedOneWithoutRegistrosInput
  }

  export type registrosUncheckedCreateWithoutPagosInput = {
    id_registro?: bigint | number
    id_usuario: bigint | number
    id_evento: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
  }

  export type registrosCreateOrConnectWithoutPagosInput = {
    where: registrosWhereUniqueInput
    create: XOR<registrosCreateWithoutPagosInput, registrosUncheckedCreateWithoutPagosInput>
  }

  export type registrosCreateManyPagosInputEnvelope = {
    data: registrosCreateManyPagosInput | registrosCreateManyPagosInput[]
    skipDuplicates?: boolean
  }

  export type usuariosUpsertWithoutPagosInput = {
    update: XOR<usuariosUpdateWithoutPagosInput, usuariosUncheckedUpdateWithoutPagosInput>
    create: XOR<usuariosCreateWithoutPagosInput, usuariosUncheckedCreateWithoutPagosInput>
    where?: usuariosWhereInput
  }

  export type usuariosUpdateToOneWithWhereWithoutPagosInput = {
    where?: usuariosWhereInput
    data: XOR<usuariosUpdateWithoutPagosInput, usuariosUncheckedUpdateWithoutPagosInput>
  }

  export type usuariosUpdateWithoutPagosInput = {
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellidos?: NullableStringFieldUpdateOperationsInput | string | null
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registros?: registrosUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateWithoutPagosInput = {
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellidos?: NullableStringFieldUpdateOperationsInput | string | null
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registros?: registrosUncheckedUpdateManyWithoutUsuariosNestedInput
  }

  export type registrosUpsertWithWhereUniqueWithoutPagosInput = {
    where: registrosWhereUniqueInput
    update: XOR<registrosUpdateWithoutPagosInput, registrosUncheckedUpdateWithoutPagosInput>
    create: XOR<registrosCreateWithoutPagosInput, registrosUncheckedCreateWithoutPagosInput>
  }

  export type registrosUpdateWithWhereUniqueWithoutPagosInput = {
    where: registrosWhereUniqueInput
    data: XOR<registrosUpdateWithoutPagosInput, registrosUncheckedUpdateWithoutPagosInput>
  }

  export type registrosUpdateManyWithWhereWithoutPagosInput = {
    where: registrosScalarWhereInput
    data: XOR<registrosUpdateManyMutationInput, registrosUncheckedUpdateManyWithoutPagosInput>
  }

  export type eventosCreateWithoutRegistrosInput = {
    id_evento?: bigint | number
    titulo: string
    descripcion?: string | null
    ubicacion?: string | null
    fecha_inicio: Date | string
    fecha_fin: Date | string
    precio?: Decimal | DecimalJsLike | number | string | null
    imagen?: string | null
    creado_evento?: Date | string | null
    actualizado_evento?: Date | string | null
    categorias: categoriasCreateNestedOneWithoutEventosInput
  }

  export type eventosUncheckedCreateWithoutRegistrosInput = {
    id_evento?: bigint | number
    titulo: string
    descripcion?: string | null
    ubicacion?: string | null
    fecha_inicio: Date | string
    fecha_fin: Date | string
    precio?: Decimal | DecimalJsLike | number | string | null
    imagen?: string | null
    id_categoria: bigint | number
    creado_evento?: Date | string | null
    actualizado_evento?: Date | string | null
  }

  export type eventosCreateOrConnectWithoutRegistrosInput = {
    where: eventosWhereUniqueInput
    create: XOR<eventosCreateWithoutRegistrosInput, eventosUncheckedCreateWithoutRegistrosInput>
  }

  export type pagosCreateWithoutRegistrosInput = {
    id_pago?: bigint | number
    monto: Decimal | DecimalJsLike | number | string
    metodo_pago?: string
    estado_pago?: string | null
    fecha_pago?: Date | string | null
    usuarios?: usuariosCreateNestedOneWithoutPagosInput
  }

  export type pagosUncheckedCreateWithoutRegistrosInput = {
    id_pago?: bigint | number
    id_usuario?: bigint | number | null
    monto: Decimal | DecimalJsLike | number | string
    metodo_pago?: string
    estado_pago?: string | null
    fecha_pago?: Date | string | null
  }

  export type pagosCreateOrConnectWithoutRegistrosInput = {
    where: pagosWhereUniqueInput
    create: XOR<pagosCreateWithoutRegistrosInput, pagosUncheckedCreateWithoutRegistrosInput>
  }

  export type usuariosCreateWithoutRegistrosInput = {
    id_usuario?: bigint | number
    nombre?: string | null
    apellidos?: string | null
    foto_perfil?: string | null
    correo: string
    contrasena?: string | null
    google_id?: string | null
    activo?: boolean | null
    rol?: string | null
    creado_en?: Date | string | null
    pagos?: pagosCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateWithoutRegistrosInput = {
    id_usuario?: bigint | number
    nombre?: string | null
    apellidos?: string | null
    foto_perfil?: string | null
    correo: string
    contrasena?: string | null
    google_id?: string | null
    activo?: boolean | null
    rol?: string | null
    creado_en?: Date | string | null
    pagos?: pagosUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosCreateOrConnectWithoutRegistrosInput = {
    where: usuariosWhereUniqueInput
    create: XOR<usuariosCreateWithoutRegistrosInput, usuariosUncheckedCreateWithoutRegistrosInput>
  }

  export type eventosUpsertWithoutRegistrosInput = {
    update: XOR<eventosUpdateWithoutRegistrosInput, eventosUncheckedUpdateWithoutRegistrosInput>
    create: XOR<eventosCreateWithoutRegistrosInput, eventosUncheckedCreateWithoutRegistrosInput>
    where?: eventosWhereInput
  }

  export type eventosUpdateToOneWithWhereWithoutRegistrosInput = {
    where?: eventosWhereInput
    data: XOR<eventosUpdateWithoutRegistrosInput, eventosUncheckedUpdateWithoutRegistrosInput>
  }

  export type eventosUpdateWithoutRegistrosInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categorias?: categoriasUpdateOneRequiredWithoutEventosNestedInput
  }

  export type eventosUncheckedUpdateWithoutRegistrosInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    id_categoria?: BigIntFieldUpdateOperationsInput | bigint | number
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pagosUpsertWithoutRegistrosInput = {
    update: XOR<pagosUpdateWithoutRegistrosInput, pagosUncheckedUpdateWithoutRegistrosInput>
    create: XOR<pagosCreateWithoutRegistrosInput, pagosUncheckedCreateWithoutRegistrosInput>
    where?: pagosWhereInput
  }

  export type pagosUpdateToOneWithWhereWithoutRegistrosInput = {
    where?: pagosWhereInput
    data: XOR<pagosUpdateWithoutRegistrosInput, pagosUncheckedUpdateWithoutRegistrosInput>
  }

  export type pagosUpdateWithoutRegistrosInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuarios?: usuariosUpdateOneWithoutPagosNestedInput
  }

  export type pagosUncheckedUpdateWithoutRegistrosInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usuariosUpsertWithoutRegistrosInput = {
    update: XOR<usuariosUpdateWithoutRegistrosInput, usuariosUncheckedUpdateWithoutRegistrosInput>
    create: XOR<usuariosCreateWithoutRegistrosInput, usuariosUncheckedCreateWithoutRegistrosInput>
    where?: usuariosWhereInput
  }

  export type usuariosUpdateToOneWithWhereWithoutRegistrosInput = {
    where?: usuariosWhereInput
    data: XOR<usuariosUpdateWithoutRegistrosInput, usuariosUncheckedUpdateWithoutRegistrosInput>
  }

  export type usuariosUpdateWithoutRegistrosInput = {
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellidos?: NullableStringFieldUpdateOperationsInput | string | null
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateWithoutRegistrosInput = {
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    apellidos?: NullableStringFieldUpdateOperationsInput | string | null
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUncheckedUpdateManyWithoutUsuariosNestedInput
  }

  export type pagosCreateWithoutUsuariosInput = {
    id_pago?: bigint | number
    monto: Decimal | DecimalJsLike | number | string
    metodo_pago?: string
    estado_pago?: string | null
    fecha_pago?: Date | string | null
    registros?: registrosCreateNestedManyWithoutPagosInput
  }

  export type pagosUncheckedCreateWithoutUsuariosInput = {
    id_pago?: bigint | number
    monto: Decimal | DecimalJsLike | number | string
    metodo_pago?: string
    estado_pago?: string | null
    fecha_pago?: Date | string | null
    registros?: registrosUncheckedCreateNestedManyWithoutPagosInput
  }

  export type pagosCreateOrConnectWithoutUsuariosInput = {
    where: pagosWhereUniqueInput
    create: XOR<pagosCreateWithoutUsuariosInput, pagosUncheckedCreateWithoutUsuariosInput>
  }

  export type pagosCreateManyUsuariosInputEnvelope = {
    data: pagosCreateManyUsuariosInput | pagosCreateManyUsuariosInput[]
    skipDuplicates?: boolean
  }

  export type registrosCreateWithoutUsuariosInput = {
    id_registro?: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
    eventos: eventosCreateNestedOneWithoutRegistrosInput
    pagos: pagosCreateNestedOneWithoutRegistrosInput
  }

  export type registrosUncheckedCreateWithoutUsuariosInput = {
    id_registro?: bigint | number
    id_evento: bigint | number
    id_pago: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
  }

  export type registrosCreateOrConnectWithoutUsuariosInput = {
    where: registrosWhereUniqueInput
    create: XOR<registrosCreateWithoutUsuariosInput, registrosUncheckedCreateWithoutUsuariosInput>
  }

  export type registrosCreateManyUsuariosInputEnvelope = {
    data: registrosCreateManyUsuariosInput | registrosCreateManyUsuariosInput[]
    skipDuplicates?: boolean
  }

  export type pagosUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: pagosWhereUniqueInput
    update: XOR<pagosUpdateWithoutUsuariosInput, pagosUncheckedUpdateWithoutUsuariosInput>
    create: XOR<pagosCreateWithoutUsuariosInput, pagosUncheckedCreateWithoutUsuariosInput>
  }

  export type pagosUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: pagosWhereUniqueInput
    data: XOR<pagosUpdateWithoutUsuariosInput, pagosUncheckedUpdateWithoutUsuariosInput>
  }

  export type pagosUpdateManyWithWhereWithoutUsuariosInput = {
    where: pagosScalarWhereInput
    data: XOR<pagosUpdateManyMutationInput, pagosUncheckedUpdateManyWithoutUsuariosInput>
  }

  export type pagosScalarWhereInput = {
    AND?: pagosScalarWhereInput | pagosScalarWhereInput[]
    OR?: pagosScalarWhereInput[]
    NOT?: pagosScalarWhereInput | pagosScalarWhereInput[]
    id_pago?: BigIntFilter<"pagos"> | bigint | number
    id_usuario?: BigIntNullableFilter<"pagos"> | bigint | number | null
    monto?: DecimalFilter<"pagos"> | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFilter<"pagos"> | string
    estado_pago?: StringNullableFilter<"pagos"> | string | null
    fecha_pago?: DateTimeNullableFilter<"pagos"> | Date | string | null
  }

  export type registrosUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: registrosWhereUniqueInput
    update: XOR<registrosUpdateWithoutUsuariosInput, registrosUncheckedUpdateWithoutUsuariosInput>
    create: XOR<registrosCreateWithoutUsuariosInput, registrosUncheckedCreateWithoutUsuariosInput>
  }

  export type registrosUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: registrosWhereUniqueInput
    data: XOR<registrosUpdateWithoutUsuariosInput, registrosUncheckedUpdateWithoutUsuariosInput>
  }

  export type registrosUpdateManyWithWhereWithoutUsuariosInput = {
    where: registrosScalarWhereInput
    data: XOR<registrosUpdateManyMutationInput, registrosUncheckedUpdateManyWithoutUsuariosInput>
  }

  export type eventosCreateManyCategoriasInput = {
    id_evento?: bigint | number
    titulo: string
    descripcion?: string | null
    ubicacion?: string | null
    fecha_inicio: Date | string
    fecha_fin: Date | string
    precio?: Decimal | DecimalJsLike | number | string | null
    imagen?: string | null
    creado_evento?: Date | string | null
    actualizado_evento?: Date | string | null
  }

  export type eventosUpdateWithoutCategoriasInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registros?: registrosUpdateManyWithoutEventosNestedInput
  }

  export type eventosUncheckedUpdateWithoutCategoriasInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registros?: registrosUncheckedUpdateManyWithoutEventosNestedInput
  }

  export type eventosUncheckedUpdateManyWithoutCategoriasInput = {
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    precio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    creado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosCreateManyEventosInput = {
    id_registro?: bigint | number
    id_usuario: bigint | number
    id_pago: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
  }

  export type registrosUpdateWithoutEventosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pagos?: pagosUpdateOneRequiredWithoutRegistrosNestedInput
    usuarios?: usuariosUpdateOneRequiredWithoutRegistrosNestedInput
  }

  export type registrosUncheckedUpdateWithoutEventosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosUncheckedUpdateManyWithoutEventosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosCreateManyPagosInput = {
    id_registro?: bigint | number
    id_usuario: bigint | number
    id_evento: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
  }

  export type registrosUpdateWithoutPagosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventos?: eventosUpdateOneRequiredWithoutRegistrosNestedInput
    usuarios?: usuariosUpdateOneRequiredWithoutRegistrosNestedInput
  }

  export type registrosUncheckedUpdateWithoutPagosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosUncheckedUpdateManyWithoutPagosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    id_usuario?: BigIntFieldUpdateOperationsInput | bigint | number
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pagosCreateManyUsuariosInput = {
    id_pago?: bigint | number
    monto: Decimal | DecimalJsLike | number | string
    metodo_pago?: string
    estado_pago?: string | null
    fecha_pago?: Date | string | null
  }

  export type registrosCreateManyUsuariosInput = {
    id_registro?: bigint | number
    id_evento: bigint | number
    id_pago: bigint | number
    cantidad?: number
    fecha_registro?: Date | string | null
  }

  export type pagosUpdateWithoutUsuariosInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registros?: registrosUpdateManyWithoutPagosNestedInput
  }

  export type pagosUncheckedUpdateWithoutUsuariosInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registros?: registrosUncheckedUpdateManyWithoutPagosNestedInput
  }

  export type pagosUncheckedUpdateManyWithoutUsuariosInput = {
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosUpdateWithoutUsuariosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventos?: eventosUpdateOneRequiredWithoutRegistrosNestedInput
    pagos?: pagosUpdateOneRequiredWithoutRegistrosNestedInput
  }

  export type registrosUncheckedUpdateWithoutUsuariosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrosUncheckedUpdateManyWithoutUsuariosInput = {
    id_registro?: BigIntFieldUpdateOperationsInput | bigint | number
    id_evento?: BigIntFieldUpdateOperationsInput | bigint | number
    id_pago?: BigIntFieldUpdateOperationsInput | bigint | number
    cantidad?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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