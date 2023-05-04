using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class lastMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8c99abd6-4b96-4024-99e1-b3f7ee55a15d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bc48cfe7-0d75-4675-aa4e-2b04e7878fe4");

            migrationBuilder.DropColumn(
                name: "status",
                table: "UsersJobs");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "637b6d63-a340-462c-abf5-73087d70eab9", "1", "ADMIN", "ADMIN" },
                    { "7c1194c1-bf2d-41e5-83af-06d4b69583e9", "2", "USER", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "637b6d63-a340-462c-abf5-73087d70eab9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7c1194c1-bf2d-41e5-83af-06d4b69583e9");

            migrationBuilder.AddColumn<bool>(
                name: "status",
                table: "UsersJobs",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8c99abd6-4b96-4024-99e1-b3f7ee55a15d", "2", "USER", "USER" },
                    { "bc48cfe7-0d75-4675-aa4e-2b04e7878fe4", "1", "ADMIN", "ADMIN" }
                });
        }
    }
}
