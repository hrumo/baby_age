/* =========================================================
   NEWSLETTER
   Hub de Gestação
   ========================================================= */


// ---------------------------------------------------------
// CONFIGURAÇÃO
// ---------------------------------------------------------

const NEWSLETTER_SEGMENT_ID =
  "109a6399-8350-4955-b8c8-fc093c4e19d8";


// ---------------------------------------------------------
// SINCRONIZAR ASSINANTE COM O RESEND
// ---------------------------------------------------------

async function syncNewsletterSubscriber(subscriberId) {

  if (!subscriberId) {
    console.error(
      "Não foi possível sincronizar newsletter: subscriberId ausente."
    );

    return {
      success: false,
      error: "subscriberId ausente."
    };
  }


  try {

    const {
      data,
      error
    } = await supabaseClient.functions.invoke(
      "sync-newsletter-subscriber",
      {
        body: {
          subscriber_id: subscriberId
        }
      }
    );


    if (error) {

      console.error(
        "Erro ao sincronizar assinante com o Resend:",
        error
      );

      console.error(
        "Detalhes da sincronização:",
        data
      );

      return {
        success: false,
        error,
        data
      };
    }


    console.log(
      "Assinante sincronizado com sucesso:",
      data
    );


    return {
      success: true,
      data
    };


  } catch (error) {

    console.error(
      "Erro inesperado ao sincronizar newsletter:",
      error
    );

    return {
      success: false,
      error
    };
  }
}


// ---------------------------------------------------------
// EXPORTAÇÃO GLOBAL
// ---------------------------------------------------------

window.newsletter = {

  segmentId: NEWSLETTER_SEGMENT_ID,

  syncSubscriber:
    syncNewsletterSubscriber

};