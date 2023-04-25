using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class newdatadsf : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "56c62f39-2d45-469c-9c95-00719ebd9c03");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e37c10b-ccef-445f-aecf-c3cb57a8811b");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "UserJobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "776a9fa9-96ad-4617-b8db-a724f54a7c22", "1", "ADMIN", "ADMIN" },
                    { "84d30340-2651-4247-9c66-f3203a39879c", "2", "USER", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "776a9fa9-96ad-4617-b8db-a724f54a7c22");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "84d30340-2651-4247-9c66-f3203a39879c");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "UserJobs");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "56c62f39-2d45-469c-9c95-00719ebd9c03", "1", "ADMIN", "ADMIN" },
                    { "7e37c10b-ccef-445f-aecf-c3cb57a8811b", "2", "USER", "USER" }
                });
        }
    }
}
