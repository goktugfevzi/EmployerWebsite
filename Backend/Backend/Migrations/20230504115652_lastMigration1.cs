using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class lastMigration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "637b6d63-a340-462c-abf5-73087d70eab9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7c1194c1-bf2d-41e5-83af-06d4b69583e9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d98f90aa-69fb-41b5-9470-50a8d82ebe39", "2", "USER", "USER" },
                    { "f0eb2be9-1522-4345-ae18-0193fd60e613", "1", "ADMIN", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d98f90aa-69fb-41b5-9470-50a8d82ebe39");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f0eb2be9-1522-4345-ae18-0193fd60e613");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "637b6d63-a340-462c-abf5-73087d70eab9", "1", "ADMIN", "ADMIN" },
                    { "7c1194c1-bf2d-41e5-83af-06d4b69583e9", "2", "USER", "USER" }
                });
        }
    }
}
