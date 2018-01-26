using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using Serilog;
using Serilog.Configuration;
using Serilog.Core;
using Serilog.Events;


namespace LeaderAnalytics.Web
{
    public class CallerEnricher : ILogEventEnricher
    {
        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
        {
            var skip = 3;
            while (true)
            {
                var stack = new StackFrame(skip, true);
                if (stack.GetMethod() == null)
                {
                    logEvent.AddPropertyIfAbsent(new LogEventProperty("Caller", new ScalarValue("<unknown method>")));
                    return;
                }

                var method = stack.GetMethod();
                var fileName = stack.GetFileName();
                var signaure = string.Join(", ", method.GetParameters().Select(pi => pi.ParameterType.FullName));
                int lineNumber = stack.GetFileLineNumber();
                if (method.DeclaringType.Assembly != typeof(Log).Assembly)
                {
                    var caller = $"{method.DeclaringType.FullName}.{method.Name}({signaure}) {fileName} line:{lineNumber}";
                    logEvent.AddPropertyIfAbsent(new LogEventProperty("Caller", new ScalarValue(caller)));
                }

                skip++;
            }
        }
    }

    public static class LoggerCallerEnrichmentConfiguration
    {
        public static LoggerConfiguration WithCaller(this LoggerEnrichmentConfiguration enrichmentConfiguration)
        {
            return enrichmentConfiguration.With<CallerEnricher>();
        }
    }

}
