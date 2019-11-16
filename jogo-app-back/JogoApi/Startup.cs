using JogoApi.Dados.DAO;
using JogoApi.Dados.DAO.Repository;
using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.Dados.Service;
using JogoApi.DTO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace JogoApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                    .AllowCredentials()
                    );
            });
            services.AddTransient<IConexaoSql, ConexaoSql>();
            services.AddTransient<ICriptografia, Criptografia>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IJogoService, JogoService>();
            services.AddTransient<IPontosService, PontosService>();
            services.AddTransient<IUsuarioService, UsuarioService>();
            services.AddTransient<IRepositoryJogo, RepositoryJogo>();
            services.AddTransient<IRepositoryPalavra, RepositoryPalavra>();
            services.AddTransient<IRepositoryPalavraRodada, RepositoryPalavraRodada>();
            services.AddTransient<IRepositoryTokenEmail, RepositoryTokenEmail>();
            services.AddTransient<IRepositoryUsuario, RepositoryUsuario>();
            services.AddTransient<IRepositoryRodada, RepositoryRodada>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseExceptionHandler(config =>
            {
                config.Run(async context =>
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "application/json";

                    var error = context.Features.Get<IExceptionHandlerFeature>();

                    if (error != null)
                    {
                        var ex = error.Error;
                        await context.Response.WriteAsync(new Retorno()
                        {
                            Codigo = 500,
                            Mensagem = ex.Message,
                            Data = ""
                        }.ToString());
                    }
                });
            });

            app.UseHttpsRedirection();
            app.UseCors("AllowSpecificOrigin");
            app.UseMvc();
        }
    }
}
