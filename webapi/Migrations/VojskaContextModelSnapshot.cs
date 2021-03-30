﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webapi.Models;

namespace webapi.Migrations
{
    [DbContext(typeof(VojskaContext))]
    partial class VojskaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4");

            modelBuilder.Entity("webapi.Models.Bataljon", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("Br")
                        .HasColumnType("int")
                        .HasColumnName("Br");

                    b.Property<int>("BrJedinica")
                        .HasColumnType("int")
                        .HasColumnName("BrJedinica");

                    b.Property<int>("BrPuk")
                        .HasColumnType("int")
                        .HasColumnName("BrPuk");

                    b.Property<int>("MaxJedinica")
                        .HasColumnType("int")
                        .HasColumnName("MaxJedinica");

                    b.Property<int?>("PukID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("PukID");

                    b.ToTable("Bataljon");
                });

            modelBuilder.Entity("webapi.Models.Puk", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("BrBataljona")
                        .HasColumnType("int")
                        .HasColumnName("BrBataljona");

                    b.Property<int>("MaxBataljona")
                        .HasColumnType("int")
                        .HasColumnName("MaxBataljona");

                    b.Property<string>("Tip")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Tip");

                    b.Property<int?>("VojskaID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("VojskaID");

                    b.ToTable("Puk");
                });

            modelBuilder.Entity("webapi.Models.Vojska", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("BrPukova")
                        .HasColumnType("int")
                        .HasColumnName("BrPukova");

                    b.Property<string>("Drzava")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Drzava");

                    b.Property<string>("Naziv")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Naziv");

                    b.Property<int>("Novac")
                        .HasColumnType("int")
                        .HasColumnName("Novac");

                    b.Property<int>("Snaga")
                        .HasColumnType("int")
                        .HasColumnName("Snaga");

                    b.HasKey("ID");

                    b.ToTable("Vojska");
                });

            modelBuilder.Entity("webapi.Models.Bataljon", b =>
                {
                    b.HasOne("webapi.Models.Puk", "Puk")
                        .WithMany("Bataljoni")
                        .HasForeignKey("PukID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Puk");
                });

            modelBuilder.Entity("webapi.Models.Puk", b =>
                {
                    b.HasOne("webapi.Models.Vojska", "Vojska")
                        .WithMany("Pukovi")
                        .HasForeignKey("VojskaID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Vojska");
                });

            modelBuilder.Entity("webapi.Models.Puk", b =>
                {
                    b.Navigation("Bataljoni");
                });

            modelBuilder.Entity("webapi.Models.Vojska", b =>
                {
                    b.Navigation("Pukovi");
                });
#pragma warning restore 612, 618
        }
    }
}
