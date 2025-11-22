# GitHub Copilot Instructions for Avascriptions Repository

Welcome to the Avascriptions repository! This document provides essential guidelines for AI coding agents to navigate and contribute effectively to this codebase. Please follow these instructions to ensure consistency and productivity.

## Repository Overview

The Avascriptions repository is a collection of tools and protocols for managing blockchain-based assets. Key components include:

1. **`backup/asc20market-contracts/`**: Contains smart contracts for the ASC20 Marketplace. These contracts manage decentralized token trading.

   - **Key files**:
     - `contracts/`: Core logic for the marketplace.
     - `scripts/`: Deployment and upgrade scripts.
     - `hardhat.config.ts`: Configuration for Hardhat.
   - **Commands**:
     - Install dependencies: `npm install`
     - Compile contracts: `npx hardhat compile`
     - Deploy contracts: `npx hardhat --network avax run scripts/deploy.ts`

2. **`backup/ASIPs/`**: Repository for proposals related to the Avascriptions and ASC-20 protocols.

   - **Key files**:
     - `ASIPs/`: Contains proposal documents.
     - `template.md`: Template for new proposals.
   - **Workflow**:
     - Clone the repository, write proposals using the template, and submit pull requests.

3. **`fetch-chaindata/`**: A utility for fetching blockchain data and storing it in MongoDB.

   - **Key files**:
     - `fetchData.js`: Main script for data fetching.
     - `.env`: Environment configuration file.
   - **Commands**:
     - Setup: Rename `sample.env` to `.env` and configure.
     - Run: `node ./index.js`

4. **`backup/open-indexer/`**: Open-source indexer for Avascriptions.
   - **Key files**:
     - `config.ini.sample`: Sample configuration file.
     - `cmd/`: Contains the main Go application.
   - **Commands**:
     - Build: `go build -o ./indexer ./cmd/main.go`
     - Run: `./indexer`

## Development Guidelines

### Code Structure

- Follow the existing modular structure. For example, smart contracts are organized into `contracts/`, `interfaces/`, and `lib/` directories.
- Use the provided templates and configurations (e.g., `template.md` for proposals, `hardhat.config.ts` for Hardhat).

### Testing and Debugging

- Use Hardhat for testing smart contracts. Refer to the `scripts/` directory for deployment and upgrade scripts.
- For `fetch-chaindata`, ensure MongoDB is running locally and `.env` is correctly configured.

### External Dependencies

- Smart contracts rely on OpenZeppelin libraries for security features like `ReentrancyGuardUpgradeable`.
- The indexer and data-fetching tools integrate with MongoDB for data storage.

### Integration Points

- The ASC20 Marketplace contracts interact with blockchain networks (e.g., Avalanche).
- The indexer provides RPC interfaces for querying indexed data.

### Project-Specific Patterns

- **Batch Operations**: Functions like `batchMatchOrders` in the ASC20 contracts enable bulk processing.
- **Event Logging**: Contracts emit events like `ASC20OrderExecuted` for transparency.
- **Snapshots**: The indexer relies on snapshots for faster initialization.

## Examples

### Deploying ASC20 Contracts

```bash
npx hardhat --network avax run scripts/deploy.ts
```

### Running the Indexer

```bash
cp config.ini.sample config.ini
./indexer --snapshot snapshots/snap-xxx.bin
```

### Fetching Blockchain Data

```bash
node ./index.js
```

## Notes

- Ensure all contributions align with the modular structure and existing patterns.
- Refer to the [official documentation](https://docs.avascriptions.com/) for additional context.

Happy coding!
