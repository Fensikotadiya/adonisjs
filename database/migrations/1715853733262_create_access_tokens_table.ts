import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateAccessTokensTable extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table
          .integer('tokenable_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
        table.string('type').notNullable()
        table.string('name').nullable()
        table.string('hash').notNullable()
        table.text('abilities').notNullable()
        table.timestamp('created_at')
        table.timestamp('updated_at')
        table.timestamp('last_used_at').nullable()
        table.timestamp('expires_at').nullable()
      })
    }
  }

  async down() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (hasTable) {
      this.schema.dropTable(this.tableName)
    }
  }
}
