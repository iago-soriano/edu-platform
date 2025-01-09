const areasArray = [
  {
    name: "Mathematics",
    namePt: "Matemática",
    topics: [
      {
        name: "Linear Algebra",
        namePt: "Álgebra Linear",
        subtopics: [
          {
            name: "Systems of Linear Equations: Gaussian Elimination",
            namePt:
              "Sistemas de Equações Lineares: método de eliminação de Gauss para sistemas lineares",
          },
          { name: "Vector Spaces", namePt: "Espaços vetoriais" },
          { name: "Subspaces", namePt: "Subespaços" },
          { name: "Bases", namePt: "Bases" },
          { name: "Direct Sums", namePt: "Somas Diretas" },
          {
            name: "Introduction to Linear Programming",
            namePt: "Introdução à Programação Linear",
          },
          {
            name: "Linear Transformations and Matrices",
            namePt: "Transformações Lineares e Matrizes",
          },
          {
            name: "Eigenvalues and Eigenvectors",
            namePt: "Autovalores e Autovetores",
          },
          { name: "Diagonalization", namePt: "Diagonalização" },
          {
            name: "Inner Product Spaces",
            namePt: "Espaços com Produto Interno",
          },
          { name: "Orthonormal Bases", namePt: "Bases Ortonormais" },
          {
            name: "Orthogonal Projections",
            namePt: "Projeções Ortogonais",
          },
          { name: "Rigid Motions", namePt: "Movimentos Rígidos" },
          {
            name: "Least Squares Method",
            namePt: "Método dos Mínimos Quadrados",
          },
          {
            name: "Transformations in Inner Product Spaces",
            namePt: "Transformações em Espaços com Produto Interno",
          },
          {
            name: "Representation Theorem for Linear Functions",
            namePt: "O Teorema da Representação para Funções Lineares",
          },
          {
            name: "Adjoint of a Linear Transformation",
            namePt: "Adjunta de uma Transformação Linear",
          },
          {
            name: "Symmetric, Unitary, Orthogonal, and Normal Operators",
            namePt: "Operadores Simétricos, Unitários, Ortogonais e Normais",
          },
          { name: "The Spectral Theorem", namePt: "O Teorema Espectral" },
          { name: "Canonical Forms", namePt: "Formas Canônicas" },
        ],
      },
      {
        name: "Combinatorics",
        namePt: "Análise Combinatória",
        subtopics: [
          { name: "Distribution", namePt: "Distribuição" },
          { name: "Permutations", namePt: "Permutações" },
          { name: "Combinations", namePt: "Combinações" },
          {
            name: "Ordinary and Exponential Generating Functions",
            namePt: "Funções Geradoras Ordinárias e Exponenciais",
          },
          {
            name: "Principle of Inclusion and Exclusion",
            namePt: "Princípio de Inclusão e Exclusão",
          },
          {
            name: "Enumeration of Partitions, Graphs, Trees, and Networks",
            namePt: "Enumeração de Partições, Grafos, Árvores e Redes",
          },
          {
            name: "Recursion in Enumeration",
            namePt: "Enumeração por Recursão",
          },
          {
            name: "Permutations with Restricted Positions",
            namePt: "Permutações com Posições Restritas",
          },
        ],
      },
      {
        name: "Analytical Geometry",
        namePt: "Geometria Analítica",
        subtopics: [
          { name: "Matrices", namePt: "Matrizes" },
          {
            name: "Systems of Linear Equations",
            namePt: "Sistemas de Equações Lineares",
          },
          { name: "Vectors", namePt: "Vetores" },
          {
            name: "Scalar, Vector, and Mixed Products",
            namePt: "Produtos: escalar, vetorial e misto",
          },
          { name: "Vector Algebra", namePt: "Álgebra Vetorial" },
          {
            name: "Lines in the Plane and Space",
            namePt: "Reta no plano e no espaço",
          },
          { name: "Planes", namePt: "Planos" },
          {
            name: "Relative Positions, Intersections, Distances, and Angles",
            namePt: "Posições Relativas, Interseções, Distâncias e Ângulos",
          },
          { name: "Circle and Sphere", namePt: "Círculo e Esfera" },
          {
            name: "Polar, Cylindrical, and Spherical Coordinates",
            namePt: "Coordenadas Polares, Cilíndricas e Esféricas",
          },
        ],
      },
      {
        name: "Probability and Statistics",
        namePt: "Probabilidade e Estatística",
        subtopics: [
          { name: "Events", namePt: "Eventos" },
          { name: "Random Experiments", namePt: "Experimentos Aleatórios" },
          {
            name: "Exploratory Data Analysis",
            namePt: "Análise Exploratória de Dados",
          },
          {
            name: "Statistical Description of Data",
            namePt: "Descrição Estatística dos Dados",
          },
          { name: "Sample Spaces", namePt: "Espaços Amostrais" },
          {
            name: "Probabilities in Discrete Sample Spaces",
            namePt: "Probabilidades em Espaços Amostrais Discretos",
          },
          {
            name: "Probability Distributions of Univariate and Bivariate Random Variables",
            namePt:
              "Distribuições de Probabilidades de Variáveis Aleatórias Unidimensionais e Bidimensionais",
          },
          {
            name: "Mathematical Expectation",
            namePt: "Esperança Matemática",
          },
          {
            name: "Variance and Correlation Coefficients",
            namePt: "Variância e Coeficientes de Correlação",
          },
          { name: "Normal Approximation", namePt: "Aproximação Normal" },
          {
            name: "Point and Interval Estimation",
            namePt: "Estimação Pontual e por Intervalo",
          },
          {
            name: "Hypothesis Testing for Means. Chi-Square Tests",
            namePt: "Teste de Hipóteses para Médias. Testes do Qui-Quadrado",
          },
          {
            name: "Mean Comparison Tests",
            namePt: "Testes de Comparações de Médias",
          },
          {
            name: "Regression and Correlation",
            namePt: "Regressão e Correlação",
          },
        ],
      },
      {
        name: "Calculus",
        namePt: "Cálculo Diferencial e Integral",
        subtopics: [
          {
            name: "Limits of Functions and Sequences",
            namePt: "Limites de Funções e de Sequências",
          },
          {
            name: "Real Functions of One Variable: Continuity and Differentiability",
            namePt:
              "Funções Reais de uma Variável: Continuidade e Diferenciabilidade",
          },
          {
            name: "Maximum and Minimum Values",
            namePt: "Máximos e Mínimos",
          },
          {
            name: "Taylor's Formula and Function Approximation",
            namePt: "Fórmula de Taylor e Aproximação de Funções",
          },
          {
            name: "Newton's Method for Roots and Optimization",
            namePt:
              "Método de Newton para o Cálculo de Raízes e de Máximos e Mínimos",
          },
          {
            name: "Integration of Real Functions of One Variable",
            namePt: "Integração de Funções Reais de uma Variável",
          },
          { name: "Integration Methods", namePt: "Métodos de Integração" },
          {
            name: "Approximate Integration",
            namePt: "Integração Aproximada",
          },
          {
            name: "Trapezoidal, Simpson, and Generalized Rules",
            namePt: "Regras dos Trapézios, de Simpson e Generalizadas",
          },
          {
            name: "Functions of Several Variables: Continuity and Differentiability",
            namePt:
              "Funções de Várias Variáveis: Continuidade e Diferenciabilidade",
          },
          { name: "Gradient", namePt: "Gradiente" },
          {
            name: "Maximum and Minimum Values",
            namePt: "Máximos e Mínimos",
          },
          {
            name: "Lagrange Multipliers",
            namePt: "Multiplicadores de Lagrange",
          },
          { name: "Transformations", namePt: "Transformações" },
          { name: "Jacobian Matrices", namePt: "Matrizes Jacobianas" },
          {
            name: "Inverse Function Theorem",
            namePt: "Teorema da Função Inversa",
          },
          {
            name: "Implicit Differentiation",
            namePt: "Diferenciação Implícita",
          },
          {
            name: "Integration of Multivariable Functions",
            namePt: "Integração de Funções de Várias Variáveis",
          },
          {
            name: "Change of Coordinates in Integrals",
            namePt: "Mudanças de Coordenadas em Integrais",
          },
          { name: "Line Integral", namePt: "Integral de Linha" },
        ],
      },

      {
        name: "Mathematical Logic",
        namePt: "Lógica Matemática",
        subtopics: [
          {
            name: "Propositional and Predicate Logic",
            namePt: "Lógica Proposicional e de Predicados",
          },
          {
            name: "Propositional and First-Order Language",
            namePt: "Linguagem Proposicional e de Primeira Ordem",
          },
          { name: "Deductive Systems", namePt: "Sistemas Dedutivos" },
          {
            name: "Truth Tables and First-Order Structures",
            namePt: "Tabelas Verdade e Estruturas de Primeira Ordem",
          },
          {
            name: "Consequence Relations",
            namePt: "Relações de Consequência",
          },
          { name: "Soundness", namePt: "Corretude" },
          { name: "Completeness", namePt: "Completude" },
          { name: "Compactness", namePt: "Compacidade" },
          { name: "Lowenheim-Skolem Theorem", namePt: "Lowemhein-Skolem" },
          { name: "Decidability", namePt: "Decidibilidade" },
          {
            name: "Automated Theorem Proving",
            namePt: "Prova Automática de Teoremas",
          },
          { name: "Non-Classical Logics", namePt: "Lógicas não-clássicas" },
        ],
      },
      {
        name: "Discrete Mathematics",
        namePt: "Matemática Discreta",
        subtopics: [
          {
            name: "Iteration, Induction, and Recursion",
            namePt: "Iteração, Indução e Recursão",
          },
          {
            name: "Sets and Set Algebra as Axiomatic Theory",
            namePt:
              "Conjuntos e Álgebra de Conjuntos como uma Teoria Axiomática",
          },
          { name: "Ordered Pair", namePt: "Par Ordenado" },
          { name: "Functions", namePt: "Funções" },
          {
            name: "Boolean Functions and Forms, Boolean Algebra, Boolean Function Minimization",
            namePt:
              "Funções e Formas Booleanas, Álgebra Booleana, Minimização de Funções Booleanas",
          },
          {
            name: "Relations on Sets, Equivalence and Order Relations",
            namePt:
              "Relações sobre Conjuntos, Relações de Equivalência e Ordem",
          },
          {
            name: "Lattices, Monoids, Groups, and Rings",
            namePt: "Reticulados, Monóides, Grupos, Anéis",
          },
          {
            name: "Coding Theory: Binary Channel, Symmetric Channel, Block Codes, Generator and Check Matrices, Group Codes, Hamming Codes",
            namePt:
              "Teoria dos Códigos: Canal Binário, Canal Simétrico, Código de Blocos, Matrizes Geradoras e Verificadoras, Códigos de Grupo, Códigos de Hamming",
          },
          {
            name: "Domain Theory: Complete Partial Orders, Continuity, Fixed Point, Domains, Function Spaces",
            namePt:
              "Teoria dos Domínios: Ordens Parciais Completas, Continuidade, Ponto Fixo, Domínios, Espaço das Funções",
          },
        ],
      },
    ],
  },
  {
    name: "Foundations of Computing",
    namePt: "Fundamentos da Computação",
    topics: [
      {
        name: "Algorithm Analysis",
        namePt: "Análise de Algoritmos",
        subtopics: [
          {
            name: "Complexity Measures, Asymptotic Analysis, Proof Techniques for Lower Bounds",
            namePt:
              "Medidas de Complexidade, Análise Assintótica de Limites de Complexidade, Técnicas de Prova de Cotas Inferiores",
          },
          {
            name: "Big O, Little o, Omega, and Theta Notation",
            namePt: "Notação 'Big O', 'Little o', 'Omega' e 'Theta'",
          },
          {
            name: "Empirical Performance Measures",
            namePt: "Medidas Empíricas de Performance",
          },
          {
            name: "Using Recurrence Relations for Recursive Algorithm Analysis",
            namePt:
              "O Uso de Relações de Recorrência para Análise de Algoritmos Recursivos",
          },
          {
            name: "Analysis of Iterative and Recursive Algorithms",
            namePt: "Análise de Algoritmos Iterativos e Recursivos",
          },
        ],
      },
      {
        name: "Algorithms and Data Structures",
        namePt: "Algoritmos e Estruturas de Dados",
        subtopics: [
          {
            name: "Algorithm Development Methodology",
            namePt: "Metodologia de Desenvolvimento de Algoritmos",
          },
          {
            name: "Basic and Structured Data Types",
            namePt: "Tipos de Dados Básicos e Estruturados",
          },
          {
            name: "Programming Language Commands",
            namePt: "Comandos de uma Linguagem de Programação",
          },
          {
            name: "Recursion: Concept and Implementation",
            namePt: "Recursividade: Conceito e Implementação",
          },
          {
            name: "Modularity and Abstraction",
            namePt: "Modularidade e Abstração",
          },
          {
            name: "Debugging Strategies",
            namePt: "Estratégias de Depuração",
          },
          {
            name: "Strings and String Processing",
            namePt: "Cadeias e Processamento de Cadeias",
          },
          {
            name: "Linear Data Structures and Generalizations: Ordered Lists, Linked Lists, Stacks, and Queues",
            namePt:
              "Estruturas de Dados Lineares e suas Generalizações: Listas Ordenadas, Listas Encadeadas, Pilhas e Filas",
          },
          {
            name: "Trees and Generalizations: Binary Trees, Search Trees, and Balanced Trees",
            namePt:
              "Árvores e suas Generalizações: Árvores Binárias, Árvores de Busca e Árvores Balanceadas",
          },
          {
            name: "Hash Tables",
            namePt: "Tabelas Hash",
          },
          {
            name: "Search and Sorting Algorithms",
            namePt: "Algoritmos para Pesquisa e Ordenação",
          },
          {
            name: "Garbage Collection Algorithms",
            namePt: "Algoritmos para 'Garbage Collection'",
          },
          {
            name: "Algorithm Design Techniques: Brute Force, Exhaustive Search, Greedy, Divide and Conquer, Backtracking, and Heuristics",
            namePt:
              "Técnicas de Projeto de Algoritmos: Método da Força Bruta, Pesquisa Exaustiva, Algoritmo Guloso, Dividir e Conquistar, 'Backtracking' e Heurísticas",
          },
        ],
      },
      {
        name: "Computer Architecture and Organization",
        namePt: "Arquitetura e Organização de Computadores",
        subtopics: [
          {
            name: "Computer Organization: Memory, CPU, Input and Output",
            namePt:
              "Organização de Computadores: Memórias, Unidades Centrais de Processamento, Entrada e Saída",
          },
          {
            name: "Assembly Languages",
            namePt: "Linguagens de Montagem",
          },
          {
            name: "Addressing Modes, Instruction Sets",
            namePt: "Modos de Endereçamento, Conjunto de Instruções",
          },
          {
            name: "Interrupt and Exception Mechanisms",
            namePt: "Mecanismos de Interrupção e de Exceção",
          },
          {
            name: "Bus, Communication, Interfaces, and Peripherals",
            namePt: "Barramento, Comunicações, Interfaces e Periféricos",
          },
          {
            name: "Memory Organization",
            namePt: "Organização de Memória",
          },
          {
            name: "Auxiliary Memory",
            namePt: "Memória Auxiliar",
          },
          {
            name: "RISC and CISC Architectures",
            namePt: "Arquiteturas RISC e CISC",
          },
          {
            name: "Pipeline",
            namePt: "Pipeline",
          },
          {
            name: "Low-Granularity Parallelism",
            namePt: "Paralelismo de Baixa Granularidade",
          },
          {
            name: "Superscalar and Superpipeline Processors",
            namePt: "Processadores Superescalares e Superpipeline",
          },
          {
            name: "Multiprocessors",
            namePt: "Multiprocessadores",
          },
          {
            name: "Multicomputers",
            namePt: "Multicomputadores",
          },
          {
            name: "Parallel and Non-Conventional Architectures",
            namePt: "Arquiteturas Paralelas e não Convencionais",
          },
        ],
      },
      {
        name: "Digital Circuits",
        namePt: "Circuitos Digitais",
        subtopics: [
          {
            name: "Number Systems and Codes",
            namePt: "Sistemas de Numeração e Códigos",
          },
          {
            name: "Binary Arithmetic",
            namePt: "Aritmética Binária",
          },
          {
            name: "Representation and Manipulation of Combinatorial Circuits",
            namePt: "Representação e Manipulação de Circuitos Combinatórios",
          },
          {
            name: "Minimization and Optimization of Combinatorial Functions",
            namePt: "Minimização e Otimização de Funções Combinatórias",
          },
          {
            name: "Design of Combinatorial Circuits",
            namePt: "Projeto de Circuitos Combinatórios",
          },
          {
            name: "Analysis and Synthesis of Sequential and Memory Components",
            namePt: "Análise e Síntese de Componentes Sequenciais e de Memória",
          },
          {
            name: "Design of Sequential Circuits. Finite State Machine (FSM) Models",
            namePt:
              "Projeto de Circuitos Sequenciais. Modelo de Máquinas de Estado Finito (FSM)",
          },
          {
            name: "Synchronous and Asynchronous Sequential Circuits",
            namePt: "Circuitos Sequenciais Síncronos e Assíncronos",
          },
          {
            name: "Storage Components",
            namePt: "Componentes de Armazenamento",
          },
          {
            name: "Hierarchical and Modular Digital System Design",
            namePt: "Projeto de Sistemas Digitais: Hierárquico e Modular",
          },
          {
            name: "Principles and Techniques of Design. Concepts of Control and Timing",
            namePt:
              "Princípios e Técnicas de Projeto. Conceitos de Controle e de Tempo",
          },
          {
            name: "Logic Families",
            namePt: "Famílias Lógicas",
          },
          {
            name: "Programmable Logic Devices (PLDs)",
            namePt: "Dispositivos Lógicos Programáveis (PLD)",
          },
        ],
      },
      {
        name: "Programming Languages",
        namePt: "Linguagens de Programação",
        subtopics: [
          {
            name: "Concepts",
            namePt: "Conceitos",
          },
          {
            name: "Programming Language Paradigms",
            namePt: "Paradigmas de Linguagens de Programação",
          },
          {
            name: "Formal Semantics",
            namePt: "Semântica Formal",
          },
          {
            name: "Type Theory: Type Systems and Polymorphism",
            namePt: "Teoria dos Tipos: Sistemas de Tipos, Polimorfismo",
          },
          {
            name: "Type Checking and Type Inference",
            namePt: "Verificação e Inferência de Tipos",
          },
        ],
      },
      {
        name: "Formal Languages, Automata, and Computability",
        namePt: "Linguagens Formais, Autômatos e Computabilidade",
        subtopics: [
          {
            name: "Grammars",
            namePt: "Gramáticas",
          },
          {
            name: "Regular, Context-Free, and Context-Sensitive Languages",
            namePt:
              "Linguagens Regulares, Livres-de-Contexto e Sensíveis-ao-Contexto",
          },
          {
            name: "Types of Recognizers",
            namePt: "Tipos de Reconhecedores",
          },
          {
            name: "Operations on Languages",
            namePt: "Operações com Linguagens",
          },
          {
            name: "Properties of Languages",
            namePt: "Propriedades das Linguagens",
          },
          {
            name: "Deterministic and Non-Deterministic Finite Automata",
            namePt:
              "Autômatos de Estados Finitos Determinístico e não Determinístico",
          },
          {
            name: "Pushdown Automata",
            namePt: "Autômatos de Pilha",
          },
          {
            name: "Turing Machine",
            namePt: "Máquina de Turing",
          },
          {
            name: "Chomsky Hierarchy and Recursive Functions",
            namePt: "Hierarquia de Chomsky. Funções Recursivas",
          },
          {
            name: "Church's Thesis",
            namePt: "Tese de Church",
          },
          {
            name: "Undecidable Problems",
            namePt: "Problemas Indecidíveis",
          },
          {
            name: "Gödel's Incompleteness Theorem",
            namePt: "Teorema da Incompletude de Gödel",
          },
          {
            name: "Problem Classes: P, NP, NP-Complete, and NP-Hard",
            namePt: "Classes de Problemas P, NP, NP Completo e NP-Difícil",
          },
          {
            name: "Problem Reduction Methods",
            namePt: "Métodos de Redução de Problemas",
          },
        ],
      },
      {
        name: "File and Data Organization",
        namePt: "Organização de Arquivos e Dados",
        subtopics: [
          {
            name: "File Organization, Structure, and Operations",
            namePt: "Organização, Estrutura e Operação de Arquivos",
          },
          {
            name: "Directories: Content and Structure",
            namePt: "Diretórios: Conteúdo e Estrutura",
          },
          {
            name: "System Files and Virtual File Systems",
            namePt: "Arquivos do Sistema e Sistema de Arquivos Virtuais",
          },
          {
            name: "Search Techniques",
            namePt: "Técnicas de Pesquisa",
          },
          {
            name: "Data and Metadata",
            namePt: "Dados e Metadados",
          },
          {
            name: "Digital and Analog Representation",
            namePt: "Representação Digital e Analógica",
          },
          {
            name: "Encoding and Decoding Algorithms",
            namePt: "Algoritmos de Codificação e Decodificação",
          },
          {
            name: "Data Compression: Audio, Image, and Video",
            namePt: "Compressão de Dados, Áudio, Imagem e Vídeo",
          },
        ],
      },
      {
        name: "Operating Systems",
        namePt: "Sistemas Operacionais",
        subtopics: [
          {
            name: "Process Concept",
            namePt: "Conceito de Processo",
          },
          {
            name: "Process and Processor Management",
            namePt: "Gerência de Processos/Processador",
          },
          {
            name: "Process Communication, Concurrency, and Synchronization",
            namePt: "Comunicação, Concorrência e Sincronização de Processos",
          },
          {
            name: "Memory Management: Virtual Memory, Paging, Segmentation, and Swapping",
            namePt:
              "Gerenciamento de Memória: Memória Virtual, Paginação, Segmentação e 'Swap'",
          },
          {
            name: "File Management. Input/Output Device Management",
            namePt:
              "Gerenciamento de Arquivos. Gerenciamento de Dispositivos de Entrada/Saída",
          },
          {
            name: "Resource Allocation",
            namePt: "Alocação de Recursos",
          },
        ],
      },
      {
        name: "Programming Techniques",
        namePt: "Técnicas de Programação",
        subtopics: [
          {
            name: "Algorithm Development",
            namePt: "Desenvolvimento de algoritmos",
          },
          {
            name: "Basic and Structured Data Types",
            namePt: "Tipos de dados básicos e estruturados",
          },
          {
            name: "Programming Language Commands",
            namePt: "Comandos de uma Linguagem de programação",
          },
          {
            name: "Program Development Methodology",
            namePt: "Metodologia de desenvolvimento de programas",
          },
          {
            name: "Modularity and Abstraction",
            namePt: "Modularidade e abstração",
          },
        ],
      },
      {
        name: "Graph Theory",
        namePt: "Teoria dos Grafos",
        subtopics: [
          {
            name: "Directed and Undirected Graphs",
            namePt: "Grafos orientados e não-orientados",
          },
          {
            name: "Paths",
            namePt: "Caminhos",
          },
          {
            name: "Planarity",
            namePt: "Planaridade",
          },
          {
            name: "Connectivity",
            namePt: "Conectividade",
          },
          {
            name: "Graph Coloring",
            namePt: "Coloração",
          },
          {
            name: "Infinite Graphs",
            namePt: "Grafos Infinitos",
          },
          {
            name: "Graph Algorithms",
            namePt: "Algoritmos em grafos",
          },
          {
            name: "Intractable Problems",
            namePt: "Problemas intratáveis",
          },
          {
            name: "Breadth-First and Depth-First Search",
            namePt: "Busca em Largura e Profundidade",
          },
          {
            name: "Shortest Path Algorithms",
            namePt: "Algoritmos do Menor Caminho",
          },
          {
            name: "Spanning Tree",
            namePt: "Árvore Geradora",
          },
          {
            name: "Topological Sorting",
            namePt: "Ordenação Topológica",
          },
        ],
      },
    ],
  },
  {
    name: "Computer Science",
    namePt: "Tecnologia da Computação",
    topics: [
      {
        name: "Database Systems",
        namePt: "Banco de Dados",
        subtopics: [
          { name: "Data Models", namePt: "Modelo de Dados" },
          {
            name: "Database Modeling and Design",
            namePt: "Modelagem e Projeto de Banco de Dados",
          },
          {
            name: "Database Management Systems (DBMS): Architecture, Security, Integrity, Concurrency, Recovery, Transaction Management",
            namePt:
              "Sistemas de Gerenciamento de Bancos de Dados (SGBD): Arquitetura, Segurança, Integridade, Concorrência, Recuperação após Falha, Gerenciamento de Transações",
          },
          {
            name: "Concurrency, Recovery, Transaction Management",
            namePt:
              "Concorrência, Recuperação após Falha, Gerenciamento de Transações",
          },
          { name: "Query Languages", namePt: "Linguagens de Consulta" },
          {
            name: "Distributed Databases",
            namePt: "Bancos de Dados Distribuídos",
          },
          { name: "Data Mining", namePt: "Mineração de Dados" },
        ],
      },
      {
        name: "Compilers",
        namePt: "Compiladores",
        subtopics: [
          {
            name: "Compilers and Interpreters",
            namePt: "Compiladores e Interpretadores",
          },
          {
            name: "Lexical and Syntax Analysis",
            namePt: "Análise Léxica e Sintática",
          },
          { name: "Symbol Tables", namePt: "Tabelas de Símbolos" },
          { name: "Translation Schemes", namePt: "Esquemas de Tradução" },
          {
            name: "Runtime Environments",
            namePt: "Ambientes de Tempo de Execução",
          },
          {
            name: "Intermediate Representation",
            namePt: "Representação Intermediária",
          },
          { name: "Semantic Analysis", namePt: "Análise Semântica" },
          { name: "Code Generation", namePt: "Geração de Código" },
          { name: "Code Optimization", namePt: "Otimização de Código" },
          {
            name: "Libraries and Separate Compilation",
            namePt: "Bibliotecas e Compilação em Separado",
          },
        ],
      },
      {
        name: "Computer Graphics",
        namePt: "Computação Gráfica",
        subtopics: [
          {
            name: "2D and 3D Geometric Transformations",
            namePt:
              "Transformações Geométricas em Duas e Três Dimensões: Coordenadas Homogêneas e Matrizes de Transformação",
          },
          {
            name: "2D Coordinate Systems and Clipping",
            namePt: "Transformação entre Sistemas de Coordenadas 2D e Recorte",
          },
          {
            name: "Parallel and Perspective Projections",
            namePt: "Transformações de Projeção Paralela e Perspectiva",
          },
          { name: "Virtual Camera", namePt: "Câmera Virtual" },
          {
            name: "3D Coordinate Systems",
            namePt: "Transformação entre Sistemas de Coordenadas 3D",
          },
          {
            name: "3D Object and Scene Definition",
            namePt:
              "Definição de Objetos e Cenas Tridimensionais: Modelos Poliedrais e Malhas de Polígonos",
          },
          {
            name: "Rendering Process",
            namePt:
              "O Processo de 'Rendering': Fontes de Luz, Remoção de Linhas e Superfícies Ocultas, Modelos de Tonalização ('Shading')",
          },
          { name: "Texture Mapping", namePt: "Aplicação de Texturas" },
          {
            name: "Aliasing and Anti-Aliasing Techniques",
            namePt:
              "O problema do Serrilhado ('Aliasing') e Técnicas de Anti-Serrilhado ('Antialiasing')",
          },
          { name: "Visualization", namePt: "Visualização" },
        ],
      },
      {
        name: "Software Engineering",
        namePt: "Engenharia de Software",
        subtopics: [
          {
            name: "Software Development Process",
            namePt: "Processo de Desenvolvimento de Software",
          },
          {
            name: "Software Development Lifecycle",
            namePt: "Ciclo de Vida de Desenvolvimento de Software",
          },
          { name: "Software Quality", namePt: "Qualidade de Software" },
          {
            name: "Planning and Management Techniques",
            namePt: "Técnicas de Planejamento e Gerenciamento de Software",
          },
          {
            name: "Configuration Management",
            namePt: "Gerenciamento de Configuração de Software",
          },
          {
            name: "Requirements Engineering",
            namePt: "Engenharia de Requisitos",
          },
          {
            name: "Analysis and Design Methods",
            namePt: "Métodos de Análise e de Projeto de Software",
          },
          {
            name: "Software Verification and Validation",
            namePt: "Verificação, Validação e Teste",
          },
          { name: "Maintenance", namePt: "Manutenção" },
          { name: "Documentation", namePt: "Documentação" },
          {
            name: "Development Standards",
            namePt: "Padrões de Desenvolvimento",
          },
          { name: "Reuse", namePt: "Reuso" },
          { name: "Reverse Engineering", namePt: "Engenharia Reversa" },
          { name: "Reengineering", namePt: "Reengenharia" },
          {
            name: "Development Environments",
            namePt: "Ambientes de Desenvolvimento de Software",
          },
        ],
      },
      {
        name: "Artificial Intelligence",
        namePt: "Inteligência Artificial",
        subtopics: [
          { name: "Symbolic Languages", namePt: "Linguagens Simbólicas" },
          { name: "Logic Programming", namePt: "Programação em Lógica" },
          {
            name: "Problem Solving as Search",
            namePt: "Resolução de Problemas como Busca",
          },
          {
            name: "Search Strategies",
            namePt: "Estratégias de Busca, Busca Cega e Busca Heurística",
          },
          {
            name: "Optimization and Heuristics",
            namePt:
              "Hill Climbing, Best First, Simulated Annealing e Algoritmo A*",
          },
          {
            name: "Search and Function Maximization",
            namePt: "Busca como Maximização de Função",
          },
          { name: "And/Or Graphs", namePt: "Grafos And/Or" },
          {
            name: "Knowledge Representation",
            namePt: "Esquemas para Representação do Conhecimento",
          },
          { name: "Production Systems", namePt: "Sistemas de Produção" },
          { name: "Bayesian Rules", namePt: "A Regra de Bayes" },
          { name: "Fuzzy Logic", namePt: "Lógica Fuzzy" },
          { name: "Machine Learning", namePt: "Aprendizado de Máquina" },
          { name: "Expert Systems", namePt: "Sistemas Especialistas" },
          {
            name: "Natural Language Processing",
            namePt: "Processamento de Linguagem Natural",
          },
          { name: "Robotics", namePt: "Robótica" },
        ],
      },
      {
        name: "Image Processing",
        namePt: "Processamento de Imagens",
        subtopics: [
          {
            name: "Introduction to Digital Filters",
            namePt: "Introdução aos Filtros Digitais",
          },
          {
            name: "State Space Methods",
            namePt: "Métodos de Espaço de Estados",
          },
          {
            name: "Human Visual Perception",
            namePt: "Noções de Percepção Visual Humana",
          },
          {
            name: "Image Sampling and Quantization",
            namePt: "Amostragem e Quantização de Imagens",
          },
          { name: "Image Transforms", namePt: "Transformadas de Imagens" },
          { name: "Image Enhancement", namePt: "Realce" },
          {
            name: "Filtering and Restoration",
            namePt: "Filtragem e Restauração",
          },
          {
            name: "Tomographic Image Reconstruction",
            namePt: "Reconstrução Tomográfica de Imagens",
          },
          { name: "Image Coding", namePt: "Codificação" },
          {
            name: "Image Analysis and Computer Vision",
            namePt: "Análise de Imagens e Noções de Visão Computacional",
          },
          {
            name: "Pattern Recognition",
            namePt: "Reconhecimento de Padrões",
          },
        ],
      },
      {
        name: "Computer Networks",
        namePt: "Redes de Computadores",
        subtopics: [
          {
            name: "Link Types, Codes, Modes, and Transmission Media",
            namePt: "Tipos de Enlace, Códigos, Modos e Meios de Transmissão",
          },
          {
            name: "Communication Protocols and Services",
            namePt: "Protocolos e Serviços de Comunicação",
          },
          {
            name: "Terminology, Topologies, Architecture Models, and Applications",
            namePt:
              "Terminologia, Topologias, Modelos de Arquitetura e Aplicações",
          },
          {
            name: "Protocol Specification",
            namePt: "Especificação de Protocolos",
          },
          {
            name: "Internet and Intranets",
            namePt: "Internet e Intranets",
          },
          {
            name: "Network Interconnection",
            namePt: "Interconexão de Redes",
          },
          { name: "Broadband Networks", namePt: "Redes de Banda Larga" },
          {
            name: "Security and Authentication",
            namePt: "Segurança e Autenticação",
          },
          {
            name: "Performance Evaluation",
            namePt: "Avaliação de Desempenho",
          },
        ],
      },
      {
        name: "Distributed Systems",
        namePt: "Sistemas Distribuídos",
        subtopics: [
          {
            name: "Basic Issues in Distributed Computing: Coordination and Synchronization, Mutual Exclusion, Message Diffusion",
            namePt:
              "Problemas Básicos em Computação Distribuída: Coordenação e Sincronização de Processos, Exclusão Mútua, Difusão de Mensagens",
          },
          {
            name: "Information Sharing: Concurrency Control, Distributed Transactions",
            namePt:
              "Compartilhamento de Informação: Controle de Concorrência, Transações Distribuídas",
          },
          {
            name: "Inter-Process Communication",
            namePt: "Comunicação entre Processos",
          },
          { name: "Fault Tolerance", namePt: "Tolerância a Falhas" },
          {
            name: "Distributed Operating Systems: File Systems, Name Servers, Shared Memory, Security",
            namePt:
              "Sistemas Operacionais Distribuídos: Sistemas de Arquivos, Servidores de Nomes, Memória Compartilhada, Segurança",
          },
        ],
      },
    ],
  },
];

import { pgTable, varchar, text, integer } from "drizzle-orm/pg-core";
import { eq, and } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";

// [TABLES]
export const contentsTable = pgTable("Contents", {
  id: varchar("id").primaryKey(),
  areaId: text("areaId"), // Foreign key to Areas table
  topicId: text("topicId"), // Foreign key to Topics table
  subtopicId: text("subtopicId"), // Foreign key to Subtopics table
  content: text("content").notNull(),
  type: varchar("type").notNull(), // ARTICLE, VIDEO, TEXT
  order: integer("order").notNull(),
  language: varchar("language").notNull(), // 'en' or 'pt'
});

export const areasTable = pgTable("Areas", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  namePt: text("namePt").notNull(),
  order: integer("order").notNull(),
});

export const topicsTable = pgTable("Topics", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  namePt: text("namePt").notNull(),
  order: integer("order").notNull(),
  areaId: text("areaId").notNull(), // Foreign key to the Areas table
});

export const subtopicsTable = pgTable("Subtopics", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  namePt: text("namePt").notNull(),
  order: integer("order").notNull(),
  topicId: text("topicId").notNull(), // Foreign key to the Topics table
});

const pool = new Pool({
  connectionString: "your_postgres_connection_string",
});

const db = drizzle(pool);

// [inserting areas, topics and subtopics]
const areasToInsert = areasArray.map((area, idx) => ({
  id: createId(),
  name: area.name,
  order: idx,
}));

const topicsToInsert = areasArray.flatMap((area) =>
  area.topics.map((topic, idx) => ({
    id: createId(),
    name: topic.name,
    namePt: topic.namePt,
    order: idx,
    areaId: areasToInsert.find((a) => a.name === area.name)?.id, // Match areaId
  }))
);

const subtopicsToInsert = areasArray.flatMap((area) =>
  area.topics.flatMap((topic) =>
    topic.subtopics.map((subtopic, idx) => ({
      id: createId(),
      name: subtopic.name,
      namePt: subtopic.namePt,
      order: idx,
      topicId: topicsToInsert.find((t) => t.name === topic.name)?.id, // Match topicId
    }))
  )
);

// Helper function to build URL with query parameters
function buildUrl(baseUrl: string, params: Record<string, any>): string {
  const queryParams = new URLSearchParams(params).toString();
  return `${baseUrl}?${queryParams}`;
}

// Function to fetch playlists related to a topic
async function fetchPlaylists(topic: string): Promise<string[]> {
  const apiKey = "YOUR_YOUTUBE_API_KEY";
  const baseUrl = "https://www.googleapis.com/youtube/v3/search";

  // Set the default query parameters
  const params = {
    part: "snippet",
    q: topic,
    type: "playlist",
    key: apiKey,
    //...additionalParams, // Merge with any additional parameters
  };

  const url = buildUrl(baseUrl, params);

  try {
    const response = await axios.get(url);
    return response.data.items.map((item: any) => item.id.playlistId);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
}

// Function to fetch videos related to a subtopic
async function fetchVideos(subtopic: string): Promise<string[]> {
  const apiKey = "YOUR_YOUTUBE_API_KEY";
  const baseUrl = "https://www.googleapis.com/youtube/v3/search";

  // Set the default query parameters
  const params = {
    part: "snippet",
    q: subtopic,
    type: "video",
    key: apiKey,
    //...additionalParams, // Merge with any additional parameters
  };

  const url = buildUrl(baseUrl, params);

  try {
    const response = await axios.get(url);
    return response.data.items.map(
      (item: any) => `https://www.youtube.com/watch?v=${item.id.videoId}`
    );
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

async function generateImage(entity: {
  name: string;
  id: string;
  type: "area" | "topic" | "subtopic";
  areaName?: string;
  topicName?: string;
}): Promise<string> {
  const openai = new OpenAI();
  const { name, id, type, areaName, topicName } = entity;

  let prompt = "";

  if (type === "area") {
    prompt = `Generate a visually captivating, high-quality image that represents the concept of ${name}. 
    This image should serve as a background or cover image for a website explaining this area. 
    It should visually embody the essence of the subject matter, incorporating abstract or metaphorical elements if applicable. 
    The image should be vibrant and creative. Avoid including text or specific logos in the image.`;
  } else if (type === "topic") {
    prompt = `Create a stunning, high-resolution image that captures the essence of the topic '${name}' 
    within the broader area of '${areaName}'. The image should visually reflect key themes, ideas, or symbolism associated with this topic, 
    while maintaining a professional and aesthetic appeal. Avoid including any text or logos in the image.`;
  } else if (type === "subtopic") {
    prompt = `Generate a high-quality, visually engaging image that represents the subtopic '${name}', 
    which is part of the topic '${topicName}' in the area of '${areaName}'. The image should focus on the specific nuances or themes 
    of this subtopic, with a clean, modern design. Avoid including text or logos in the image.`;
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1792x1024",
  });

  const imageUrl = response.data[0].url;
  const filePath = path.resolve("images", `${id}.jpg`); // Save as a .jpg file

  // Fetch and save the image locally
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(imageBuffer));

  return filePath; // Return the local file path
}

// Function to generate summary with dynamic context based on area, topic, and subtopic
async function generateSummary(area: any, topic: any, subtopic: any) {
  // Construct the prompt for Chat GPT
  let prompt = `Provide a brief summary on the area of ${area.name}`;
  if (topic) prompt += `, on the topic of ${topic.name}`;
  if (subtopic) prompt += `, in the subtopic of ${subtopic.name}`;

  prompt += ".";

  const completion = await this._openAiApi.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0]?.message?.content;
}

async function insertContentsSummaries(areasArray: any[]) {
  for (const area of areasArray) {
    // Generate and insert the area summary and image
    const areaSummary = await generateSummary(area, null, null);
    const areaImage = await generateImage({
      name: area.name,
      id: area.id,
      type: "area",
    });
    // Update the area with the cover image URL
    await db
      .update(areasTable)
      .set({ coverImageUrl: areaImage })
      .where(eq(areasTable.id, area.id));

    await db.insert(contentsTable).values({
      id: createId(),
      areaId: area.id,
      content: areaSummary,
      type: "ARTICLE",
      order: 1,
    });

    for (const topic of area.topics) {
      // Generate and insert the topic summary and image
      const topicSummary = await generateSummary(area, topic, null);
      const topicImage = await generateImage({
        name: topic.name,
        id: topic.id,
        type: "topic",
        areaName: area.name,
      });
      // Update the topic with the cover image URL
      await db
        .update(topicsTable)
        .set({ coverImageUrl: topicImage })
        .where(eq(topicsTable.id, topic.id));

      await db.insert(contentsTable).values({
        id: createId(),
        topicId: topic.id,
        content: topicSummary,
        type: "ARTICLE",
        order: 0,
      });

      const playlistIds = await fetchPlaylists(topic.name);
      for (const playlistId of playlistIds) {
        const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
        await db.insert(contentsTable).values({
          id: createId(),
          topicId: topic.id,
          content: playlistUrl,
          type: "VIDEO",
          order: 1,
        });
      }

      for (const subtopic of topic.subtopics) {
        // Generate and save the subtopic image
        const subtopicImage = await generateImage({
          name: subtopic.name,
          id: subtopic.id,
          type: "subtopic",
          areaName: area.name,
          topicName: topic.name,
        });

        // Update the subtopic with the cover image URL
        await db
          .update(subtopicsTable)
          .set({ coverImageUrl: subtopicImage })
          .where(eq(subtopicsTable.id, subtopic.id));

        // Generate and insert the subtopic summary
        const subtopicSummary = await generateSummary(area, topic, subtopic);
        await db.insert(contentsTable).values({
          id: createId(),
          subtopicId: subtopic.id,
          content: subtopicSummary,
          type: "ARTICLE",
          order: 0,
        });

        // Fetch videos related to the subtopic
        const videoUrls = await fetchVideos(subtopic.name);
        for (const videoUrl of videoUrls) {
          await db.insert(contentsTable).values({
            id: createId(),
            subtopicId: subtopic.id,
            content: videoUrl,
            type: "VIDEO",
            order: 1,
          });
        }
      }
    }
  }
}

(async () => {
  await fs.mkdir("images", { recursive: true });

  // Insert into the database
  await db.insert(areasTable).values(areasToInsert);
  await db.insert(topicsTable).values(topicsToInsert);
  await db.insert(subtopicsTable).values(subtopicsToInsert);

  await insertContentsSummaries(areasArray);
})();
