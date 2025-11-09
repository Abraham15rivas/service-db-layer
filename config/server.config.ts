import * as os from 'os';

const getServerIp = (environment: string): string => {
  if (environment === 'development') {
    return '127.0.0.1'
  }

  const networkInterfaces = os.networkInterfaces()

  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName]

    if (!addresses) continue

    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address
      }
    }
  }

  return 'localhost'
}

export default getServerIp