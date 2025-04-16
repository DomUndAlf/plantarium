
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Bed_plantsScalarFieldEnum = {
  bed_id: 'bed_id',
  plant_id: 'plant_id',
  quantity: 'quantity',
  planting_date: 'planting_date'
};

exports.Prisma.BedsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  name: 'name',
  x_position: 'x_position',
  y_position: 'y_position',
  width: 'width',
  height: 'height',
  watered: 'watered'
};

exports.Prisma.Individual_plantsScalarFieldEnum = {
  user_id: 'user_id',
  plant_id: 'plant_id',
  x_position: 'x_position',
  y_position: 'y_position',
  planting_date: 'planting_date',
  watered: 'watered'
};

exports.Prisma.Plant_typesScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PlantsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type_id: 'type_id',
  growth_type: 'growth_type',
  edible: 'edible',
  watering_interval: 'watering_interval',
  bloom_start_month: 'bloom_start_month',
  bloom_end_month: 'bloom_end_month',
  harvest_start_month: 'harvest_start_month',
  harvest_end_month: 'harvest_end_month',
  image: 'image'
};

exports.Prisma.SurfacesScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  type: 'type',
  x_position: 'x_position',
  y_position: 'y_position',
  width: 'width',
  height: 'height',
  texture_id: 'texture_id'
};

exports.Prisma.TexturesScalarFieldEnum = {
  id: 'id',
  type: 'type',
  image: 'image'
};

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  shibboleth_id: 'shibboleth_id',
  location: 'location',
  width: 'width',
  height: 'height',
  background_image_url: 'background_image_url'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.bedsOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.plant_typesOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.plantsOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.usersOrderByRelevanceFieldEnum = {
  shibboleth_id: 'shibboleth_id',
  location: 'location',
  background_image_url: 'background_image_url'
};
exports.plants_growth_type = exports.$Enums.plants_growth_type = {
  beet: 'beet',
  single: 'single'
};

exports.surfaces_type = exports.$Enums.surfaces_type = {
  wiese: 'wiese',
  weg: 'weg',
  beet: 'beet',
  geb_ude: 'geb_ude'
};

exports.textures_type = exports.$Enums.textures_type = {
  wiese: 'wiese',
  weg: 'weg',
  beet: 'beet',
  geb_ude: 'geb_ude'
};

exports.Prisma.ModelName = {
  bed_plants: 'bed_plants',
  beds: 'beds',
  individual_plants: 'individual_plants',
  plant_types: 'plant_types',
  plants: 'plants',
  surfaces: 'surfaces',
  textures: 'textures',
  users: 'users'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
