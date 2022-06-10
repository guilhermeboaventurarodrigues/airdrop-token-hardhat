const { expect } = require("chai");
const { ethers } = require("hardhat");
const { it } = require("mocha");

describe("CryptoToken tests", function () {
  supply = 1000;
  it("checking supply", async function () {
    const cry = await ethers.getContractFactory("CryptoToken");

    const crydeply = await cry.deploy(supply);
    await crydeply.deployed();

    expect(await crydeply.totalSupply()).to.equal(supply);
  });

  it("supply to owner", async function () {
    const [owner] = await ethers.getSigners();

    const cry = await ethers.getContractFactory("CryptoToken", owner);
    const crydeply = await cry.deploy(supply);
    await crydeply.deployed();

    expect(await crydeply.balanceOf(owner.address)).to.equal(supply);
  });

  it("transferOK", async function () {
    const [owner, wallet1] = await ethers.getSigners();
    const cry = await ethers.getContractFactory("CryptoToken", owner);
    const crydeply = await cry.deploy(supply);
    await crydeply.deployed();

    await crydeply.transfer(wallet1.address, "500");

    expect(await crydeply.balanceOf(wallet1.address)).to.equal("500");

    describe("test airdrop", function () {
      supply = 1000;
      it("subscribe", async function () {
        const [owner] = await ethers.getSigners();
        const cry = await ethers.getContractFactory("CryptoToken", owner);
        const crydeply = await cry.deploy(supply);
        await crydeply.deployed();

        const air = await ethers.getContractFactory("Airdrop", owner);
        const airdeply = await air.deploy(crydeply.address);
        await airdeply.deployed();

        expect(await airdeply.subscribe()).to.be.ok;
      });
    });
  });
});
