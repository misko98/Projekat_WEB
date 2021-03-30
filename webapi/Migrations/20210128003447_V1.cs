using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vojska",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Drzava = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Novac = table.Column<int>(type: "int", nullable: false),
                    Snaga = table.Column<int>(type: "int", nullable: false),
                    BrPukova = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vojska", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Puk",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tip = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BrBataljona = table.Column<int>(type: "int", nullable: false),
                    MaxBataljona = table.Column<int>(type: "int", nullable: false),
                    VojskaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Puk", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Puk_Vojska_VojskaID",
                        column: x => x.VojskaID,
                        principalTable: "Vojska",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Bataljon",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrPuk = table.Column<int>(type: "int", nullable: false),
                    Br = table.Column<int>(type: "int", nullable: false),
                    MaxJedinica = table.Column<int>(type: "int", nullable: false),
                    BrJedinica = table.Column<int>(type: "int", nullable: false),
                    PukID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bataljon", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Bataljon_Puk_PukID",
                        column: x => x.PukID,
                        principalTable: "Puk",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bataljon_PukID",
                table: "Bataljon",
                column: "PukID");

            migrationBuilder.CreateIndex(
                name: "IX_Puk_VojskaID",
                table: "Puk",
                column: "VojskaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bataljon");

            migrationBuilder.DropTable(
                name: "Puk");

            migrationBuilder.DropTable(
                name: "Vojska");
        }
    }
}
