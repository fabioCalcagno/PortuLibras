using JogoApi.Dados.Interface;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace JogoApi.Dados.Service
{
    public enum CryptProvider
    {
        Rijndael,
        RC2,
        DES,
        TripleDES
    }

    public class Criptografia : ICriptografia
    {
        private string _key = string.Empty;

        private CryptProvider _cryptProvider;

        private SymmetricAlgorithm _algorithm;

        private void SetIV()
        {
            switch (_cryptProvider)
            {
                case CryptProvider.Rijndael:
                    _algorithm.IV = new byte[] { 0xf, 0x6f, 0x13, 0x2e, 0x35, 0xc2, 0xcd, 0xf9, 0x5, 0x46, 0x9c, 0xea, 0xa8, 0x4b, 0x73, 0xcc };
                    break;
                default:
                    _algorithm.IV = new byte[] { 0xf, 0x6f, 0x13, 0x2e, 0x35, 0xc2, 0xcd, 0xf9 };
                    break;
            }
        }

        public string Key
        {
            get { return _key; }

            set { _key = value; }
        }

        public Criptografia()
        {
            _algorithm = new RijndaelManaged();
            _algorithm.Mode = CipherMode.CBC;
            _cryptProvider = CryptProvider.Rijndael;
        }

        public Criptografia(CryptProvider cryptProvider)
        {
            switch (cryptProvider)
            {
                case CryptProvider.Rijndael:
                    _algorithm = new RijndaelManaged();
                    _cryptProvider = CryptProvider.Rijndael;
                    break;
                case CryptProvider.RC2:
                    _algorithm = new RC2CryptoServiceProvider();
                    _cryptProvider = CryptProvider.RC2;
                    break;
                case CryptProvider.DES:
                    _algorithm = new DESCryptoServiceProvider();
                    _cryptProvider = CryptProvider.DES;
                    break;
                case CryptProvider.TripleDES:
                    _algorithm = new TripleDESCryptoServiceProvider();
                    _cryptProvider = CryptProvider.TripleDES;
                    break;
            }
            _algorithm.Mode = CipherMode.CBC;
        }

        public virtual byte[] GetKey()
        {
            string salt = string.Empty;

            if (_algorithm.LegalKeySizes.Length > 0)
            {
                int keySize = _key.Length * 8;
                int minSize = _algorithm.LegalKeySizes[0].MinSize;
                int maxSize = _algorithm.LegalKeySizes[0].MaxSize;
                int skipSize = _algorithm.LegalKeySizes[0].SkipSize;

                if (keySize > maxSize)
                {
                    _key = _key.Substring(0, maxSize / 8);
                }
                else if (keySize < maxSize)
                {
                    int validSize = (keySize <= minSize) ? minSize : (keySize - keySize % skipSize) + skipSize;
                    if (keySize < validSize)
                    {
                        _key = _key.PadRight(validSize / 8, '*');
                    }
                }
            }
            PasswordDeriveBytes key = new PasswordDeriveBytes(_key, ASCIIEncoding.ASCII.GetBytes(salt));
            return key.GetBytes(_key.Length);
        }

        public virtual string Encrypt(string texto)
        {
            byte[] plainByte = Encoding.UTF8.GetBytes(texto);

            byte[] keyByte = GetKey();

            _algorithm.Key = keyByte;
            SetIV();
            ICryptoTransform cryptoTransform = _algorithm.CreateEncryptor();

            MemoryStream _memoryStream = new MemoryStream();

            CryptoStream _cryptoStream = new CryptoStream(_memoryStream, cryptoTransform, CryptoStreamMode.Write);

            _cryptoStream.Write(plainByte, 0, plainByte.Length);

            _cryptoStream.FlushFinalBlock();

            byte[] cryptoByte = _memoryStream.ToArray();

            return Convert.ToBase64String(cryptoByte, 0, cryptoByte.GetLength(0));
        }

        public virtual string Decrypt(string textoCriptografado)
        {

            byte[] cryptoByte = Convert.FromBase64String(textoCriptografado);
            byte[] keyByte = GetKey();


            _algorithm.Key = keyByte;
            SetIV();

            ICryptoTransform cryptoTransform = _algorithm.CreateDecryptor();

            try
            {
                MemoryStream _memoryStream = new MemoryStream(cryptoByte, 0, cryptoByte.Length);

                CryptoStream _cryptoStream = new CryptoStream(_memoryStream, cryptoTransform, CryptoStreamMode.Read);

                StreamReader _streamReader = new StreamReader(_cryptoStream);

                return _streamReader.ReadToEnd();
            }
            catch
            {
                return null;
            }
        }

        public string Descriptografar(string senhaCriptografada)
        {
            string key = "Criptografia";

            Criptografia crip = new Criptografia(CryptProvider.DES);

            crip.Key = key;

            return crip.Decrypt(senhaCriptografada);
        }

        public string Criptografar(string senhaNormal)
        {
            string key = "Criptografia";

            Criptografia crip = new Criptografia(CryptProvider.DES);

            crip.Key = key;

            return crip.Encrypt(senhaNormal);
        }
    }
}
