import { useEffect, useState, useRef } from "react";
import { Box, Button, Stack, Switch } from "@mui/material";
import routes from "../../../../../../routes";
import { reverse } from "named-urls";
import ConstructorServices from "../../ConstructorServices";
import { useClipboard } from 'use-clipboard-copy';

const cs = new ConstructorServices();

const SendPoll = ({ slug, option_is_published, id, }) => {
    const clipboard = useClipboard();
    const [url, setUrl] = useState();
    const [is_published, setIsPublished] = useState(option_is_published);
    const first_change = useRef(true);

    useEffect(() => {
        setUrl(
            "http://" + window.location.host + reverse(routes.polls.passing.to, { slug: slug })
        )
    }, []);

    const handleChangeCorrect = () => {
        setIsPublished(is_published == true ? false : true);
    }

    useEffect(() => {
        if (first_change == true) {
            first_change = false;
            return;
        }
        cs.updateIsPublished(id, is_published)
            .then((res) => { })
            .catch((err) => {
                first_change = true;
                setIsPublished(is_published == true ? false : true);
                alert("Ошибка, данные невозможно обновить!");
            })

    }, [is_published,])

    return (
        <Box sx={{ mt: "20", }}>
            <Box sx={{
                backgroundColor: "white",
                borderRadius: "25px",
                mx: "20vw",
                minHeight: "100px",
            }}>
                <Stack justifyContent="center" direction="row" alignItems="center">
                    <p>Отправить опрос</p>
                </Stack>
                {is_published == true ?
                    <Box>
                        <br/>
                        <p>
                            Ссылка: {url} <Button onClick={() => {
                                clipboard.copy(url);
                                alert("Ссылка на опрос скопирована");
                            }}>Скопировать</Button>
                        </p>
                        <br/>
                        <Switch color="secondary" size="small"
                            defaultChecked name="correct" id="correct"
                            onChange={handleChangeCorrect} /> Опрос опубликован
                    </Box> :
                    <Box>
                        <Switch color="secondary" size="small"
                            name="correct" id="correct"
                            onChange={handleChangeCorrect} /> Нажмите, чтобы опубликовать
                    </Box>
                }
                <Button onClick={() => window.location.replace(
                    routes.polls.cats.default
                )}>Каталоги опросов</Button>
            </Box>

        </Box>
    )
}
export default SendPoll;