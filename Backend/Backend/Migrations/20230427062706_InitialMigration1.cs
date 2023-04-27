using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Departments_departmentId",
                table: "Jobs");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4bf99ebd-230a-4a7f-b4cc-f63c593bff5d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "58faac0b-f9cc-471c-baa5-b889632224c4");

            migrationBuilder.RenameColumn(
                name: "departmentId",
                table: "Jobs",
                newName: "DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_departmentId",
                table: "Jobs",
                newName: "IX_Jobs_DepartmentId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "530dbcf5-c355-4519-8299-e9dd203e3209", "1", "ADMIN", "ADMIN" },
                    { "cb577c22-4c0d-4a8a-89b0-b7dac4b9a7a4", "2", "USER", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Departments_DepartmentId",
                table: "Jobs",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Departments_DepartmentId",
                table: "Jobs");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "530dbcf5-c355-4519-8299-e9dd203e3209");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cb577c22-4c0d-4a8a-89b0-b7dac4b9a7a4");

            migrationBuilder.RenameColumn(
                name: "DepartmentId",
                table: "Jobs",
                newName: "departmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_DepartmentId",
                table: "Jobs",
                newName: "IX_Jobs_departmentId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4bf99ebd-230a-4a7f-b4cc-f63c593bff5d", "1", "ADMIN", "ADMIN" },
                    { "58faac0b-f9cc-471c-baa5-b889632224c4", "2", "USER", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Departments_departmentId",
                table: "Jobs",
                column: "departmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
