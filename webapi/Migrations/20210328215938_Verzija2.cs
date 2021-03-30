using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class Verzija2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bataljon_Puk_PukID",
                table: "Bataljon");

            migrationBuilder.DropForeignKey(
                name: "FK_Puk_Vojska_VojskaID",
                table: "Puk");

            migrationBuilder.AddForeignKey(
                name: "FK_Bataljon_Puk_PukID",
                table: "Bataljon",
                column: "PukID",
                principalTable: "Puk",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Puk_Vojska_VojskaID",
                table: "Puk",
                column: "VojskaID",
                principalTable: "Vojska",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bataljon_Puk_PukID",
                table: "Bataljon");

            migrationBuilder.DropForeignKey(
                name: "FK_Puk_Vojska_VojskaID",
                table: "Puk");

            migrationBuilder.AddForeignKey(
                name: "FK_Bataljon_Puk_PukID",
                table: "Bataljon",
                column: "PukID",
                principalTable: "Puk",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Puk_Vojska_VojskaID",
                table: "Puk",
                column: "VojskaID",
                principalTable: "Vojska",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
