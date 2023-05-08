using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class lastMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2c4d2bcd-90b4-443e-b664-e443b875f54b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fe4eb46-b5e7-48d5-8e99-daadbd2f61d5");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "Jobs");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "273dca1f-5549-4c0e-ac97-bbce1b8b1806", "1", "ADMIN", "ADMIN" },
                    { "842b4ece-7aaf-4733-9668-f1b1eb047520", "2", "USER", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "273dca1f-5549-4c0e-ac97-bbce1b8b1806");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "842b4ece-7aaf-4733-9668-f1b1eb047520");

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
                    { "2c4d2bcd-90b4-443e-b664-e443b875f54b", "1", "ADMIN", "ADMIN" },
                    { "8fe4eb46-b5e7-48d5-8e99-daadbd2f61d5", "2", "USER", "USER" }
                });
        }
    }
}
