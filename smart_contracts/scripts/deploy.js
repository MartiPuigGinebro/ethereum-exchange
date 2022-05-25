/**
 * Implementa una nueva instancia del contrato 'Transactions' en la cadena de bloques.
 */
const main = async () => {
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();

    await transactions.deployed();

    console.log("Transactions deployed to:", transactions.address);
};

/**
 * Ejecuta la función principal y sale del proceso con un código de estado de 0 si tiene éxito o 1 si falla
 */
const run = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

run();
