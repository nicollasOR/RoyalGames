using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RoyalGamess.Aplications.Autenticacao;
using RoyalGamess.Aplications.Services;
using RoyalGamess.Contexts;
using RoyalGamess.Interfaces;
using RoyalGamess.Repositorys;
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

// chamar nossa conex�o com o banco aqui na program
builder.Services.AddDbContext<Royal_GamessContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Usu�rio
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<UsuarioService>();
//Autentica��oJwt
builder.Services.AddScoped<AutenticacaoService>();
builder.Services.AddScoped<GeradorTokenJWT>();
// Genero
builder.Services.AddScoped<IGeneroRepository, GeneroRepository>();
builder.Services.AddScoped<GeneroService>();

// Classifica��o Indicativa
builder.Services.AddScoped<IClassificacaoIndicativa, ClassificacaoIndicativaRepository>();
builder.Services.AddScoped<ClassificacaoService>();

builder.Services.AddScoped<IJogoRepository, JogoRepository>();
builder.Services.AddScoped<JogoService>();

builder.Services.AddScoped<ILogAlteracaoJogoRepository, LogAlteracaoJogoRepository>();
builder.Services.AddScoped<LogAlteracaoJogoService>();

//promocao
builder.Services.AddScoped<IPromocaoRepository, PromocaoRepository>();
builder.Services.AddScoped<PromocaoService>();

//plataforma
builder.Services.AddScoped<IPlataformaRepository, PlataformaRepository>();
builder.Services.AddScoped<PlataformaService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
     .AddJwtBearer(options =>
     {
         // L� a chave secreta definida no appsettings.json.
         // Essa chave � usada para ASSINAR o token quando ele � gerado
         // e tamb�m para VALIDAR se o token recebido � verdadeiro.
         var chave = builder.Configuration["Jwt:Key"]!;

         // Quem emitiu o token (ex: nome da sua aplica��o).
         // Serve para evitar aceitar tokens de outro sistema.
         var issuer = builder.Configuration["Jwt:Issuer"]!;

         // Para quem o token foi criado (normalmente o frontend ou a pr�pria API).
         // Tamb�m ajuda a garantir que o token pertence ao seu sistema.
         var audience = builder.Configuration["Jwt:Audience"]!;

         // Define as regras que ser�o usadas para validar o token recebido.
         options.TokenValidationParameters = new TokenValidationParameters
         {
             // Verifica se o emissor do token � v�lido
             // (se bate com o issuer configurado).
             ValidateIssuer = true,

             // Verifica se o destinat�rio do token � v�lido
             // (se bate com o audience configurado).
             ValidateAudience = true,

             // Verifica se o token ainda est� dentro do prazo de validade.
             // Se j� expirou, a requisi��o ser� negada.
             ValidateLifetime = true,

             // Verifica se a assinatura do token � v�lida.
             // Isso garante que o token n�o foi alterado.
             ValidateIssuerSigningKey = true,

             // Define qual emissor � considerado v�lido.
             ValidIssuer = issuer,

             // Define qual audience � considerado v�lido.
             ValidAudience = audience,

             // Define qual chave ser� usada para validar a assinatura do token.
             // A mesma chave usada na gera��o do JWT deve estar aqui.
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