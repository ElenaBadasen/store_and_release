// This script can be used to deploy the "StoreAndRelease" contract using ethers.js library.
// Please make sure to compile "./contracts/StoreAndRelease.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './ethers-lib'

(async () => {
  try {
    const result = await deploy('StoreAndRelease', [])
    console.log(`address: ${result.address}`)
  } catch (e) {
    console.log(e.message)
  }
})()