using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using VisitorApp.API.Models;

namespace VisitorApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/SeedData/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("admin123", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);

                }

                context.SaveChanges();
            }
        }

        public static void SeedVisitors(DataContext context)
        {
            Random rnd = new Random();
            if (!context.Visitors.Any())
            {
                var visitorsData = System.IO.File.ReadAllText("Data/SeedData/VistorSeedData.json");
                var visitors = JsonConvert.DeserializeObject<List<Visitor>>(visitorsData);

                foreach (var visitor in visitors)
                {
                    if (rnd.Next(0, 100) > 3)
                        visitor.VisitEnd = visitor.VisitBegin.AddMinutes(rnd.Next(10, 200));
                    context.Visitors.Add(visitor);
                }

                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}