using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VisitorApp.API.Migrations
{
    public partial class AddedVisitorEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Visitors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VisitType = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Company = table.Column<string>(nullable: true),
                    NumberPlate = table.Column<string>(nullable: true),
                    VisitBegin = table.Column<DateTime>(nullable: false),
                    VisitEnd = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visitors", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Visitors");
        }
    }
}
