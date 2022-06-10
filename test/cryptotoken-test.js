const { expect } = require("chai");
const { ethers } = require("hardhat");
const { it } = require("mocha");

describe("checking supply CryptoToken", function () {
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

  describe("transfer", function () {
    supply = 1000;
    it("transferOK", async function () {
      const [owner, wallet1] = await ethers.getSigners();
      const cry = await ethers.getContractFactory("CryptoToken", owner);
      const crydeply = await cry.deploy(supply);
      await crydeply.deployed();

      await crydeply.transfer(wallet1.address, "500");

      expect(await crydeply.balanceOf(wallet1.address)).to.equal("500");
    });
  });
});
