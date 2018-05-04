using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace backend
{
    public class Startup
    {
        private readonly ILogger _logger;

        public Startup(ILoggerFactory loggerFactory, IHostingEnvironment env, IConfiguration configuration)
        {
            Configuration = configuration;
            Environment = env;
            _logger = loggerFactory.CreateLogger<Startup>();
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string audience = "https://graph.windows.net/";
            string authority = "https://login.microsoftonline.com/stefangeigeroutlook.onmicrosoft.com/";

            services.AddMvc();
            services.AddCors();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority = authority;
                o.Audience = audience;
                o.Events = new JwtBearerEvents()
                {
                    OnTokenValidated = c =>
                    {
                        return Task.CompletedTask;
                    },


                    OnAuthenticationFailed = c =>
                    {
                        _logger.LogDebug("OnAuthenticationFailed");
                        _logger.LogDebug(c.Exception.ToString());

                        c.NoResult();
                        c.Response.StatusCode = 500;
                        c.Response.ContentType = "text/plain";
                        if (Environment.IsDevelopment())
                        {
                            return c.Response.WriteAsync(c.Exception.ToString());
                        }

                        return c.Response.WriteAsync("An error occured processing your authentication.");
                    }
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
