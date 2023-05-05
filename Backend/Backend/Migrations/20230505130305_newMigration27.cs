using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class newMigration27 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7808e0f-66f6-4be2-af24-0f7ad7f9157a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d6ab988a-a3e0-4866-931c-7d3904805ce2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2c4d2bcd-90b4-443e-b664-e443b875f54b", "1", "ADMIN", "ADMIN" },
                    { "8fe4eb46-b5e7-48d5-8e99-daadbd2f61d5", "2", "USER", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2c4d2bcd-90b4-443e-b664-e443b875f54b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fe4eb46-b5e7-48d5-8e99-daadbd2f61d5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c7808e0f-66f6-4be2-af24-0f7ad7f9157a", "1", "ADMIN", "ADMIN" },
                    { "d6ab988a-a3e0-4866-931c-7d3904805ce2", "2", "USER", "USER" }
                });
        }
    }
}
