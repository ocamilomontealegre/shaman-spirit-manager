# Project: Shaman King Spirit Management System

## Project Overview

This project simulates a system where shamans (users) can manage their spirits. The system will allow shamans to register, bind with spirits, and perform actions like summoning, training, and dueling with other shamans. The project will utilize Object-Oriented Programming (OOP) principles to model shamans, spirits, and their interactions, while integrating NestJS components such as controllers, services, and modules.

## Core Concepts

- **Shaman**:
  - Shamans are users who manage spirits. They have properties like a name, level, and a collection of spirits they control.
  
- **Spirit**:
  - Spirits have attributes like name, power, type (e.g., elemental, warrior), and level. They can be trained to increase their power and effectiveness in duels.
  
- **Duel**:
  - Shamans can duel with each other using their spirits. The system will calculate the outcome of the duel based on factors such as spirit power, level, and strategy.
  
- **Training**:
  - Shamans can train their spirits to increase their level and power, making them more formidable in duels.

## Learning Goals

- **Classes and Objects**:
  - Learn to create classes for Shamans, Spirits, and Duels. These classes will have properties and methods for interacting with the system (e.g., summoning, dueling, training).

- **Encapsulation**:
  - Protect the internal logic of how spirits gain power and how duels are calculated. Encapsulation will be achieved by keeping sensitive data and logic hidden within services and models.

- **Inheritance and Polymorphism**:
  - Extend the base `Spirit` class to create different types of spirits such as `ElementalSpirit` and `GuardianSpirit`, each with unique attributes and behaviors.

- **Dependency Injection**:
  - Use NestJS’s Dependency Injection (DI) system to inject services into controllers and manage interactions between shamans and spirits in a scalable way.

## Core Components

### Shamans

- **Properties**: `name`, `level`, `collection of spirits`
- **Methods**: `summonSpirit()`, `trainSpirit()`, `duel()`

### Spirits

- **Properties**: `name`, `power`, `type`, `level`
- **Methods**: `train()`, `attack()`

### Duel

- **Properties**: `shaman1`, `shaman2`, `spirits in battle`
- **Methods**: `calculateOutcome()`

## System Design

### Controllers

- **ShamanController**: Handles shaman-related routes such as registration, summoning spirits, training, and initiating duels.

### Services

- **ShamanService**: Contains the business logic for managing shamans, including binding with spirits and executing duels.
- **SpiritService**: Manages spirit training, calculating spirit power, and handling spirit interactions.
- **DuelService**: Simulates duels between shamans and calculates the outcome based on the spirits’ power and strategies.

### Modules

- **ShamanModule**: Combines all shaman-related components (controllers, services) into one module.
- **SpiritModule**: Manages spirit-related components and integrates them into the system.

## Example Workflow

1. **Registration**: A shaman registers their name and starts at level 1.
2. **Binding**: The shaman binds with a spirit from a pool of available spirits.
3. **Training**: The shaman can train their spirits to increase their level and power.
4. **Dueling**: Shamans challenge each other to duels, where the outcome is calculated based on the spirits’ attributes and levels.
5. **Leveling Up**: Winning duels and training spirits increase the shaman’s overall level, unlocking stronger spirits and more powerful abilities.

## Tech Stack

- **Language**: TypeScript
- **Framework**: NestJS for building the backend and handling DI
- **Database**: (Optional) Use a relational database like PostgreSQL or SQLite for storing shaman and spirit data
- **Testing**: Use Jest for writing unit tests to ensure correct behavior of services and logic
