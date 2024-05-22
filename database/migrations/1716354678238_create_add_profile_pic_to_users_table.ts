import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddProfilePicToUsers extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('profile_pic').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('profile_pic')
    })
  }
}
