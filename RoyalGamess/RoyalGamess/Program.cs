using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RoyalGamess.Contexts;
using RoyalGamess.Interfaces;
using RoyalGamess.Repositorys;
using RoyalGamess.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Value: Bearer TokenJWT"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// chamar nossa conexão com o banco aqui na program
builder.Services.AddDbContext<Royal_GamessContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Usuário
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<UsuarioService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
     .AddJwtBearer(options =>
     {
         // Lê a chave secreta definida no appsettings.json.
         // Essa chave é usada para ASSINAR o token quando ele é gerado
         // e também para VALIDAR se o token recebido é verdadeiro.
         var chave = builder.Configuration["Jwt:Key"]!;

         // Quem emitiu o token (ex: nome da sua aplicação).
         // Serve para evitar aceitar tokens de outro sistema.
         var issuer = builder.Configuration["Jwt:Issuer"]!;

         // Para quem o token foi criado (normalmente o frontend ou a própria API).
         // Também ajuda a garantir que o token pertence ao seu sistema.
         var audience = builder.Configuration["Jwt:Audience"]!;

         // Define as regras que serão usadas para validar o token recebido.
         options.TokenValidationParameters = new TokenValidationParameters
         {
             // Verifica se o emissor do token é válido
             // (se bate com o issuer configurado).
             ValidateIssuer = true,

             // Verifica se o destinatário do token é válido
             // (se bate com o audience configurado).
             ValidateAudience = true,

             // Verifica se o token ainda está dentro do prazo de validade.
             // Se já expirou, a requisição será negada.
             ValidateLifetime = true,

             // Verifica se a assinatura do token é válida.
             // Isso garante que o token não foi alterado.
             ValidateIssuerSigningKey = true,

             // Define qual emissor é considerado válido.
             ValidIssuer = issuer,

             // Define qual audience é considerado válido.
             ValidAudience = audience,

             // Define qual chave será usada para validar a assinatura do token.
             // A mesma chave usada na geração do JWT deve estar aqui.
             IssuerSigningKey = new SymmetricSecurityKey(
                 Encoding.UTF8.GetBytes(chave)
             )
         };
     });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();