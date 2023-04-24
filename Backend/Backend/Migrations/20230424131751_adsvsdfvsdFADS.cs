using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class adsvsdfvsdFADS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b7db727-f9fc-4991-be41-e0d66f3cd20a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "44ce3878-9288-419e-8e7a-f2af7e6401d3");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0e42a897-7606-4054-a8a7-8b3355a8bd71", "2", "USER", "USER" },
                    { "cf9547cc-39be-4405-ab37-3ddce665627e", "1", "ADMIN", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0e42a897-7606-4054-a8a7-8b3355a8bd71");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cf9547cc-39be-4405-ab37-3ddce665627e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1b7db727-f9fc-4991-be41-e0d66f3cd20a", "2", "User", "User" },
                    { "44ce3878-9288-419e-8e7a-f2af7e6401d3", "1", "Admin", "Admin" }
                });
        }
    }
}
