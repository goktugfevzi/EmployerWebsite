using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class newMigration26 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d98f90aa-69fb-41b5-9470-50a8d82ebe39");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f0eb2be9-1522-4345-ae18-0193fd60e613");

            migrationBuilder.AddColumn<string>(
                name: "userId",
                table: "Jobs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c7808e0f-66f6-4be2-af24-0f7ad7f9157a", "1", "ADMIN", "ADMIN" },
                    { "d6ab988a-a3e0-4866-931c-7d3904805ce2", "2", "USER", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7808e0f-66f6-4be2-af24-0f7ad7f9157a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d6ab988a-a3e0-4866-931c-7d3904805ce2");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "Jobs");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d98f90aa-69fb-41b5-9470-50a8d82ebe39", "2", "USER", "USER" },
                    { "f0eb2be9-1522-4345-ae18-0193fd60e613", "1", "ADMIN", "ADMIN" }
                });
        }
    }
}
