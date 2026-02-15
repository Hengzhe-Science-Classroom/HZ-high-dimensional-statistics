# 高维统计 · Interactive

> Lasso theory, random matrix theory, minimax lower bounds — statistics when dimensions outnumber observations.

[Open the App](https://hengzhe-science-classroom.github.io/HZ-high-dimensional-statistics/)

Part of [Hengzhe's Science Classroom](https://hengzhe-science-classroom.github.io/hub/) · **Tier 5 · Research Frontier**

---

## Chapters

| # | Topic | Sections | Viz | Exercises |
|---|-------|----------|-----|-----------|
| **Part A** | **高维概率基础 (High-Dimensional Probability Foundations)** | | | |
| 0 | 高维世界的奇异性 (The Strangeness of High Dimensions) | Curse of dimensionality, norm behavior, concentration shell, non-asymptotic viewpoint | 2 | 4 |
| 1 | 集中不等式 I — 次高斯理论 (Concentration I — Sub-Gaussian) | Hoeffding, sub-Gaussian variables, ψ₂ norm, maximal inequalities | 2 | 5 |
| 2 | 集中不等式 II — 次指数与一般方法 (Concentration II — Sub-Exponential & General) | Bernstein, sub-exponential, McDiarmid, Gaussian concentration | 2 | 5 |
| 3 | 高维随机向量 (Random Vectors in High Dimensions) | Hanson-Wright, Johnson-Lindenstrauss lemma, random projections | 2 | 5 |
| 4 | 覆盖数与度量熵 (Covering Numbers and Metric Entropy) | ε-nets, covering/packing, Dudley integral, generic chaining | 2 | 4 |
| **Part B** | **随机矩阵基础 (Random Matrix Theory Basics)** | | | |
| 5 | Wigner 矩阵与半圆律 (Wigner Matrices and the Semicircle Law) | Wigner ensemble, ESD, moment method, GOE | 2 | 4 |
| 6 | Marchenko-Pastur 律与样本协方差 (Marchenko-Pastur Law) | MP distribution, Stieltjes transform, Bai-Yin theorem, PCA implications | 2 | 5 |
| 7 | 尖峰模型与 Tracy-Widom 分布 (Spiked Models and Tracy-Widom) | BBP phase transition, TW distribution, signal detection | 2 | 4 |
| **Part C** | **稀疏估计 (Sparse Estimation)** | | | |
| 8 | Lasso 基本理论 (Lasso — Basic Theory) | L1 relaxation, RE condition, compatibility, oracle inequality | 3 | 5 |
| 9 | Lasso 的变体与推广 (Lasso Variants and Extensions) | Dantzig selector, square-root Lasso, elastic net, group Lasso, SCAD, MCP | 3 | 5 |
| 10 | 稀疏恢复的计算方法 (Computational Methods) | Coordinate descent, ISTA/FISTA, ADMM, cross-validation, Bayesian Lasso | 3 | 5 |
| **Part D** | **高维检验与推断 (High-Dimensional Testing & Inference)** | | | |
| 11 | 多重检验与 FDR 控制 (Multiple Testing and FDR) | Bonferroni, BH procedure, Storey's method, q-values | 3 | 5 |
| 12 | 去偏 Lasso 与高维置信区间 (Debiased Lasso and CIs) | Debiased/desparsified Lasso, node-wise regression, asymptotic normality | 2 | 4 |
| 13 | 选择性推断与 Knockoffs (Selective Inference and Knockoffs) | Post-selection inference, polyhedral lemma, model-X knockoffs | 3 | 5 |
| **Part E** | **矩阵估计 (Matrix Estimation)** | | | |
| 14 | 矩阵补全 (Matrix Completion) | Nuclear norm minimization, incoherence, exact recovery, alternating minimization | 3 | 5 |
| 15 | 高维 PCA 与稀疏 PCA (High-Dimensional and Sparse PCA) | Spiked models, Davis-Kahan, sparse PCA, computational-statistical gap | 3 | 4 |
| 16 | 协方差估计与图模型 (Covariance Estimation and Graphical Models) | Thresholding, graphical Lasso, CLIME, Gaussian graphical models | 3 | 5 |
| 17 | 低秩恢复与矩阵分解 (Low-Rank Recovery) | Robust PCA, principal component pursuit, matrix sensing, nuclear norm RIP | 3 | 4 |
| **Part F** | **非参数与极小极大理论 (Nonparametric & Minimax Theory)** | | | |
| 18 | 极小极大下界 (Minimax Lower Bounds) | Le Cam, Fano, Assouad, sparse regression lower bound | 3 | 5 |
| 19 | 最优速率与自适应 (Optimal Rates and Adaptation) | Stone's theorem, Lepski's method, model selection, aggregation | 3 | 5 |
| | **Total** | | **~65** | **~92** |

---

## References

1. Martin J. Wainwright, *High-Dimensional Statistics: A Non-Asymptotic Viewpoint*, Cambridge University Press, 2019.
2. Peter Bühlmann & Sara van de Geer, *Statistics for High-Dimensional Data: Methods, Theory and Applications*, Springer, 2011.
3. Roman Vershynin, *High-Dimensional Probability: An Introduction with Applications in Data Science*, Cambridge University Press, 2018.
4. Trevor Hastie, Robert Tibshirani & Ryan Tibshirani, *Statistical Learning with Sparsity: The Lasso and Generalizations*, CRC Press, 2015.
5. Sara van de Geer, *Estimation and Testing Under Sparsity: École d'Été de Probabilités de Saint-Flour XLV*, Springer, 2016.

---

## Features

- **Interactive Visualizations** — Curse-of-dimensionality explorers, eigenvalue distribution histograms with Marchenko-Pastur overlays, Lasso regularization paths, FDR threshold animations, matrix completion fill-in demos
- **Rigorous Theory with Intuition** — Every oracle inequality and minimax rate is motivated by interactive examples before the formal proof
- **Computational Illustrations** — Coordinate descent animations, ISTA vs. FISTA convergence races, cross-validation curve builders
- **Research-Frontier Depth** — BBP phase transition, computational-statistical gaps in sparse PCA, knockoff filters, debiased inference
- **Bilingual Presentation** — Chapter titles in Chinese and English; mathematical exposition accessible to both audiences

---

## Quick Start

```bash
git clone https://github.com/Hengzhe-Science-Classroom/HZ-high-dimensional-statistics.git
cd HZ-high-dimensional-statistics
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## License

MIT
