import { useRouter } from "next/router";
import { useEffect } from "react";

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const { access_token } = router.query;

    if (access_token) {
      // Simpan token di localStorage
      localStorage.setItem("jwt", access_token);

      // Redirect ke halaman utama setelah menyimpan token
      router.push("/");
    }
  }, [router.query]);

  return <p>Authenticating...</p>;
};

export default Callback;
