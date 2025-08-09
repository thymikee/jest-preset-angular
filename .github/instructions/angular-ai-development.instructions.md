# Angular AI Development Guidelines for Jest Preset Angular

This guide provides detailed Angular AI development best practices specifically tailored for jest-preset-angular development workflows.

## Angular AI Development with Model Context Protocol (MCP)

Based on [Angular's MCP guidance](https://angular.dev/ai/mcp), leverage these AI-assisted development principles:

### Context Management

- **Repository Context**: Always provide clear context about the jest-preset-angular project when working with AI
- **File Relationships**: Understand how transformers, presets, and environments interact within the Angular ecosystem
- **Testing Context**: Maintain awareness of both unit testing (Jest) and Angular-specific testing patterns

### AI-Assisted Development Patterns

- **Incremental Development**: Use AI to help with small, focused changes rather than large refactors
- **Code Review**: Leverage AI for code review suggestions, especially for TypeScript types and Angular-specific patterns
- **Documentation**: Use AI to help maintain and update documentation as code evolves
- **Error Resolution**: Utilize AI for debugging transformer issues and Jest configuration problems

## Angular AI Development Guidelines

Following [Angular's AI development guidelines](https://angular.dev/ai/develop-with-ai#custom-prompts-and-system-instructions):

### Custom Prompts for Jest Preset Angular

- **Transformer Development**: "Help me create a Jest transformer for Angular components that handles [specific requirement] while maintaining compatibility with both CommonJS and ESM"
- **Configuration Issues**: "Analyze this Jest configuration for Angular testing and suggest improvements for [specific scenario]"
- **Performance Optimization**: "Review this transformer code for performance bottlenecks in the Angular compilation pipeline"

### System Instructions for Angular Jest Development

- Always consider both isolated and non-isolated module compilation modes
- Ensure compatibility with multiple Angular versions (v18, v19, v20+)
- Maintain backward compatibility while adding new features
- Test changes across both CommonJS and ESM module formats
- Consider impact on build performance and memory usage

### AI-Assisted Code Patterns

- **Type Safety**: Use AI to help maintain strict TypeScript typing across transformers
- **Testing Strategies**: Leverage AI for creating comprehensive test scenarios
- **Documentation**: Generate clear, concise documentation for complex transformer logic
- **Migration Helpers**: Create AI prompts for helping users migrate between Jest preset versions

## Jest Preset Angular Specific Practices

- **Transformer Design**: When modifying transformers, ensure compatibility with both CommonJS and ESM module formats
- **Angular Integration**: Maintain seamless integration with Angular's compilation pipeline and testing framework
- **Performance Considerations**: Consider transformer execution time and memory usage when making changes
