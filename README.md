# Nomad SDK

A comprehensive tracking solution including SDK, server, and management platform.

## Mainly Project Structure

```
nomad_sdk/
├── packages/
│   ├── track-sdk/
│   │   ├── src/              # SDK source code
│   │   │   ├── types.ts      # Type definitions
│   │   │   ├── track-point.ts # Core tracking logic
│   │   │   └── index.ts      # Public API
│   │   ├── test/             # Test files
│   │   └── package.json
│   │
│   ├── track-server/
│   │   ├── src/
│   │   │   ├── routes/       # API routes
│   │   │   ├── models/       # Database models
│   │   │   └── index.ts      # Server entry
│   │   └── package.json
│   │
│   └── track-platform/
│       ├── src/              # React application
│       └── package.json
│
└── README.md
```

## Development

```bash
# Install dependencies
npm install

# Start SDK development
cd track-sdk
npx http-server . --cors -c-1 -p 8080

# Start server development
npm run dev:server

# Start platform development
npm run dev:platform
```

## Features

- Event tracking and reporting
- Page initialization and registration
- Common parameter management
- User environment info collection
- Error monitoring and reporting
- Queue-based batch reporting
- Request limiting
- White screen monitoring

## Documentation

See [需求文档](./doc/Requirement_ZH.md) or [Requirements](./doc/requirement.md) for detailed information. 